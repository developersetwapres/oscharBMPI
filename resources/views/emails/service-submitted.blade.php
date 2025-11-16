@php
    $url = 'https://oscar.bpmi.go.id';
@endphp

<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <style>
        body { font-family: Arial, sans-serif; background:#f6f7f9; padding:20px; }
        .container { max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px; }
        .btn {
            display:inline-block;
            padding:10px 16px;
            background:#0b63d6;
            color:#ffffff !important;
            text-decoration:none;
            border-radius:6px;
            font-weight:bold;
            margin-top:16px;
        }
        .info-box {
            background:#f1f5f9;
            padding:14px;
            border-radius:8px;
            margin-top:16px;
            font-size:14px;
        }
    </style>
</head>

<body>
    <div class="container">

        <p>Yth. <strong>{{ $name }}</strong>,</p>

        <p>Permintaan layanan Anda pada platform <strong>OSCAR BPMI</strong> telah berhasil diajukan dan diterima oleh admin. Saat ini status permintaan layanan Anda berada pada tahap <strong>“Menunggu”</strong>.</p>

        <div class="info-box">
            <strong>Detail Permintaan:</strong><br>
            Nama Pemohon : {{ $name }}<br>
            Kode Permintaan : {{ $kode }}<br>
            Kategori Layanan : {{ $kategori }}<br>
            Status : Menunggu
        </div>

        <a class="btn" href="{{ $url }}/layanan" target="_blank">Lihat Status Layanan</a>

        <p style="margin-top:32px;">Hormat kami,<br>Tim OSCAR BPMI</p>
    </div>
</body>
</html>
