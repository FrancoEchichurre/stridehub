import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-slate-50 to-blue-50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-2xl mb-3 bg-brand-gradient bg-clip-text text-transparent">StrideHub</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Tu destino premium para el mejor calzado deportivo y casual. Encuentra las marcas líderes y las últimas tendencias.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-primary">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@stridehub.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-colors">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>456 Athletic Ave, Sports City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-primary">Horario</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="flex justify-between"><span className="font-medium">Lunes - Viernes:</span> <span>9:00 - 20:00</span></p>
              <p className="flex justify-between"><span className="font-medium">Sábado:</span> <span>10:00 - 18:00</span></p>
              <p className="flex justify-between"><span className="font-medium">Domingo:</span> <span>11:00 - 17:00</span></p>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-brand-primary">StrideHub</span>. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
