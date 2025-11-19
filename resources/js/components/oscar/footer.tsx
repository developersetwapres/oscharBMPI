export function Footer() {
    return (
        <footer className="mt-12 bg-card">
            <div className="mx-auto max-w-full px-6 py-12">
                {/* Divider */}
                <div className="my-8 border-t border-border" />

                {/* Copyright & Credits */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-xs text-muted-foreground md:text-left">
                        <span className="font-semibold text-foreground">
                            © 2025 OSCAR BPMI Setwapres
                        </span>{' '}
                        · All rights reserved
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                        Developed by{' '}
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
