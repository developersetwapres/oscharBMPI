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

        .info-box {
            background: #f1f5f9;
            padding: 14px;
            border-radius: 8px;
            margin-top: 16px;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="container">

        <p>Yth. <strong>{{ $name }}</strong>,</p>

        <p>Status permintaan layanan Anda pada platform <strong>OSCAR BPMI</strong> telah mengalami perubahan. Berikut
            adalah informasi pembaruan status terbaru:</p>

        <div class="info-box">
            <strong>Detail Permintaan:</strong><br>
            Nama Pemohon : {{ $name }}<br>
            Kode Permintaan : {{ $kode }}<br>
            Kategori Layanan : {{ $kategori }}<br>
            Status Saat Ini : <strong>{{ $status }}</strong>
        </div>

        <a class="btn" href="{{ config('app.url') }}" target="_blank">Lihat Status Terbaru</a>

        <p style="margin-top:32px;">Hormat kami,<br>Tim OSCAR BPMI</p>
    </div>
</body>

</html>
