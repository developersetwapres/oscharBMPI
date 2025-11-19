export function Footer() {
    return (
        <footer className="bg-white/50 backdrop-blur-sm">
            <div className="mx-auto max-w-3xl px-4 py-12">
                {/* Divider */}
                <div className="my-8 border-t border-gray-200" />

                {/* Copyright */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>
                        <span className="font-semibold text-foreground">
                            {' '}
                            © 2025 OSCAR BPMI Setwapres
                        </span>
                        · All rights reserved · Developed by{' '}
                        <span className="font-semibold text-foreground">
                            Khairil MZ
                        </span>{' '}
                        (System & Design)
                    </p>
                </div>
            </div>
        </footer>
    );
}
