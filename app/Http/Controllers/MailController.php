<?php

namespace App\Http\Controllers;

use App\Mail\NotificationMail;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendMail()
    {
        $mailData = [
            'title' => 'Email HTML dari Laravel 12',
            'body' => 'Contoh isi email menggunakan SMTP Gmail.'
        ];

        Mail::to('developersetwapres@gmail.com')->send(new NotificationMail($mailData));
        dd("Email berhasil dikirim.");
    }
}
