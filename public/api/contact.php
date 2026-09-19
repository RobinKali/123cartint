<?php
header('Content-Type: application/json; charset=UTF-8');

// Alleen POST verzoeken toestaan
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Alleen POST verzoeken zijn toegestaan.']);
    exit;
}

// Honeypot spam bescherming: als dit verborgen veld is ingevuld, is het een bot
if (!empty($_POST['_gotcha'])) {
    // Doe alsof het gelukt is om bots om de tuin te leiden
    echo json_encode(['success' => true, 'message' => 'Aanvraag succesvol verwerkt.']);
    exit;
}

// Invoer ophalen en ontsmetten
$naam = isset($_POST['naam']) ? trim(strip_tags($_POST['naam'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$kenteken = isset($_POST['kenteken']) ? strtoupper(trim(strip_tags($_POST['kenteken']))) : '';
$bericht = isset($_POST['bericht']) ? trim(strip_tags($_POST['bericht'])) : '';

// Validatie van verplichte velden
if (empty($naam) || empty($email) || empty($bericht)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Vul alstublieft alle verplichte velden (naam, e-mail en bericht) in.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Vul een geldig e-mailadres in.']);
    exit;
}

// E-mail samenstellen
$to = 'info@123cartint.nl';
$subject = 'Nieuwe contactaanvraag via 123cartint.nl - ' . $naam;

$body = "Er is een nieuwe aanvraag binnengekomen via de website 123cartint.nl:\n\n";
$body .= "--------------------------------------------------\n";
$body .= "Naam:        " . $naam . "\n";
$body .= "E-mail:      " . $email . "\n";
if (!empty($kenteken)) {
    $body .= "Kenteken:    " . $kenteken . "\n";
}
$body .= "Datum/Tijd:  " . date('d-m-Y H:i:s') . "\n";
$body .= "--------------------------------------------------\n\n";
$body .= "Bericht:\n" . $bericht . "\n\n";

// Headers
$headers = [];
$headers[] = 'From: 123Cartint Website <no-reply@123cartint.nl>';
$headers[] = 'Reply-To: ' . $naam . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

// Verzenden via PHP mail()
$mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.'
    ]);
} else {
    // Mocht de testserver nog geen werkende mailserver/sendmail hebben geconfigureerd:
    // Log fout en geef een nette reactie met fallback
    error_log("[123Cartint Contact] E-mail kon niet worden verzonden voor: " . $email);
    echo json_encode([
        'success' => true,
        'warning' => 'mail_fallback',
        'message' => 'Bedankt voor uw aanvraag! Mocht u binnen 24 uur geen reactie ontvangen, neem dan direct contact met ons op via WhatsApp.'
    ]);
}
