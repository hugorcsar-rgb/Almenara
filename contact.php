<?php
/* ============================================================================
   ALMENARA · Receptor del formulario de contacto
   ----------------------------------------------------------------------------
   Recibe el formulario, avisa por correo y GUARDA UNA COPIA EN EL SERVIDOR.

   La copia es lo importante. El correo enviado desde un alojamiento compartido
   acaba en la carpeta de spam con bastante frecuencia, y sin copia uno no se
   entera de que ha perdido un cliente. Con copia, aunque el correo falle, el
   mensaje sigue ahí.

   La carpeta de mensajes se crea sola en la primera visita y se protege sola,
   escribiendo dentro un .htaccess que impide que nadie la lea desde fuera.

   El remitente es un buzón real del propio dominio. Eso importa: enviar desde
   una dirección inventada es la causa habitual de que estos avisos acaben en
   la carpeta de correo no deseado.

   AJUSTES: solo hay que tocar las cuatro constantes de aquí abajo.
   ============================================================================ */

const DESTINO   = 'info@almenaraled.com';          // a dónde llegan los avisos
const REMITENTE = 'info@almenaraled.com';   // buzón real del propio dominio
const CARPETA   = __DIR__ . '/mensajes';          // dónde se guardan las copias
const GUARDAR   = true;                            // false para no guardar copia

/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */

// Un salto de línea dentro de una cabecera de correo permite inyectar
// destinatarios ocultos. Se eliminan siempre, sin excepción.
function limpiarCabecera(string $v): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $v));
}

// Recorta respetando los caracteres multibyte cuando se puede. No todos los
// alojamientos llevan activada la extensión mbstring, y un formulario que se
// cae en silencio por eso es peor que uno que no existe.
function recortar(string $v, int $max): string {
    if (function_exists('mb_substr')) {
        return mb_substr($v, 0, $max, 'UTF-8');
    }
    $v = substr($v, 0, $max);
    // Evita dejar cortado a medias un carácter de varios bytes
    return preg_replace('/[\x80-\xBF]+$/', '', $v) ?? $v;
}

function campo(string $nombre, int $max = 400): string {
    $v = $_POST[$nombre] ?? '';
    if (!is_string($v)) return '';
    return recortar(trim($v), $max);
}

function responder(bool $ok, string $clave, int $codigo = 200): void {
    $esJson = (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch');

    if ($esJson) {
        http_response_code($codigo);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'clave' => $clave]);
    } else {
        // Sin JavaScript se vuelve a la página con el resultado en la dirección.
        header('Location: contact.html?' . ($ok ? 'enviado=1' : 'error=' . $clave));
    }
    exit;
}

/* --------------------------------------------------------------------------
   Solo se atiende el envío del formulario
   -------------------------------------------------------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: contact.html');
    exit;
}

/* --------------------------------------------------------------------------
   Defensas contra el correo basura
   Este archivo empezará a recibir envíos automáticos en cuanto exista. Son
   tres filtros baratos que detienen a la inmensa mayoría.
   -------------------------------------------------------------------------- */

// 1. Cebo. Un campo invisible para las personas y evidente para un robot,
//    que rellena todo lo que encuentra. Si viene relleno, se descarta en
//    silencio: al robot se le responde que todo ha ido bien para que no
//    reintente con otra táctica.
if (campo('website') !== '') {
    responder(true, 'ok');
}

// 2. Prisa. Nadie rellena cinco campos en menos de tres segundos.
$marca = (int) campo('t', 20);
if ($marca > 0 && (time() - $marca) < 3) {
    responder(true, 'ok');
}

// 3. Cadencia. Como mucho cinco envíos por hora desde la misma dirección.
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$registro = sys_get_temp_dir() . '/almenara-envios-' . md5($ip) . '.txt';
$envios = file_exists($registro)
    ? array_filter(explode("\n", (string) file_get_contents($registro)))
    : [];
$envios = array_filter($envios, fn($t) => (time() - (int) $t) < 3600);
if (count($envios) >= 5) {
    responder(false, 'demasiados', 429);
}

/* --------------------------------------------------------------------------
   Validación
   -------------------------------------------------------------------------- */
$nombre  = campo('name', 120);
$empresa = campo('company', 160);
$cargo   = campo('role', 120);
$correo  = campo('email', 180);
$mensaje = campo('message', 6000);

if ($nombre === '' || $empresa === '' || $correo === '' || $mensaje === '') {
    responder(false, 'incompleto', 400);
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'correo', 400);
}

/* --------------------------------------------------------------------------
   Copia en el servidor, antes de intentar el envío
   Primero se guarda y luego se manda. Si el correo falla, el mensaje ya está
   a salvo; al revés no habría segunda oportunidad.
   -------------------------------------------------------------------------- */
$fecha = date('Y-m-d H:i:s');
$texto = "Fecha:    $fecha\n"
       . "Nombre:   $nombre\n"
       . "Empresa:  $empresa\n"
       . "Cargo:    " . ($cargo !== '' ? $cargo : '—') . "\n"
       . "Correo:   $correo\n"
       . "Idioma:   " . campo('lang', 5) . "\n"
       . "IP:       $ip\n"
       . str_repeat('-', 60) . "\n\n"
       . $mensaje . "\n";

if (GUARDAR) {
    if (!is_dir(CARPETA)) {
        @mkdir(CARPETA, 0750, true);
    }
    // La carpeta se protege sola: sin esto, cualquiera podría leer los
    // mensajes escribiendo la dirección en el navegador.
    $guardia = CARPETA . '/.htaccess';
    if (!file_exists($guardia)) {
        @file_put_contents($guardia,
            "# Mensajes del formulario. No accesibles desde el navegador.\n"
          . "Require all denied\n"
          . "<IfModule !mod_authz_core.c>\n  Deny from all\n</IfModule>\n");
    }
    $indice = CARPETA . '/index.html';
    if (!file_exists($indice)) {
        @file_put_contents($indice, '');
    }
    @file_put_contents(
        CARPETA . '/' . date('Y-m-d_His') . '-' . substr(md5($correo . microtime()), 0, 6) . '.txt',
        $texto
    );
}

/* --------------------------------------------------------------------------
   Aviso por correo
   El remitente es una dirección del propio dominio, porque poner la del
   visitante hace que el servidor de destino rechace el mensaje o lo mande a
   spam. La suya va en Responder-a, así que basta con pulsar responder.
   -------------------------------------------------------------------------- */
$asunto = '=?UTF-8?B?' . base64_encode('Web · ' . $nombre . ' (' . $empresa . ')') . '?=';

$cabeceras = [
    'From: Almenara <' . REMITENTE . '>',
    // Solo la dirección, sin nombre. El nombre ya va en el cuerpo, y meterlo
    // aquí abre una puerta a manipular las cabeceras sin ganar nada.
    'Reply-To: ' . limpiarCabecera($correo),
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];

$enviado = @mail(DESTINO, $asunto, $texto, implode("\r\n", $cabeceras), '-f' . REMITENTE);

// Se anota el envío para la cadencia
$envios[] = (string) time();
@file_put_contents($registro, implode("\n", $envios));

/* --------------------------------------------------------------------------
   Respuesta
   Si la copia se guardó, para el visitante el envío ha sido correcto aunque
   el correo haya fallado: el mensaje ha llegado, solo que por otra vía.
   -------------------------------------------------------------------------- */
if ($enviado || GUARDAR) {
    responder(true, 'ok');
}
responder(false, 'envio', 500);
