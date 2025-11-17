<!doctype html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f6f7f9;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 24px;
            border-radius: 8px;
        }

        .btn {
            display: inline-block;
            padding: 10px 16px;
            background: #0b63d6;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 16px;
        }
    </style>
</head>

<body>
    <div class="container">
        <p>Yth. <strong>{{ $name }}</strong>,</p>

        <p>Pendaftaran Anda pada platform <strong>OSCAR BPMI</strong> telah <strong>berhasil diverifikasi</strong>. Anda
            kini sudah dapat menggunakan seluruh layanan yang tersedia.</p>

        <p>Silakan mulai mengajukan permintaan layanan sesuai kebutuhan Anda.</p>

        <a class="btn" href="{{ config('app.url') }}" target="_blank">Ajukan Layanan Sekarang</a>

        <p style="margin-top:32px;">Hormat kami,<br>Tim OSCAR BPMI</p>
    </div>
</body>

</html>
