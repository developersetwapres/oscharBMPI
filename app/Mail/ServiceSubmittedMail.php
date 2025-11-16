<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ServiceSubmittedMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public string $name;
    public string $kode;
    public string $kategori;

    public function __construct(string $name, string $kode, string $kategori)
    {
        $this->name     = $name;
        $this->kode     = $kode;
        $this->kategori = $kategori;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Permintaan Layanan Anda Telah Diajukan (OSCAR BPMI)',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.service-submitted',
            with: [
                'name'     => $this->name,
                'kode'     => $this->kode,
                'kategori' => $this->kategori,
            ],
        );
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
