import { AlertTriangle, MessageSquare, X } from "lucide-react";

interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full relative">
        <div className="grid md:grid-cols-2">
          <div className="bg-blue-600 p-8 rounded-l-2xl flex flex-col justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <MessageSquare size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Bienvenido a ChatApp
              </h2>
              <p className="text-blue-100">
                Conecta con personas de todo el mundo en tiempo real. Chatea,
                comparte y crea conexiones significativas.
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4 max-w-sm mx-auto">
              <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
                onClick={() => {
                  onClose();
                }}
              >
                Iniciar Sesión
              </button>

              <button
                className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  onClose();
                }}
              >
                Registrarse
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    O continúa como
                  </span>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="text-orange-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">Cuenta de Invitado</p>
                    <p>
                      Acceso limitado por 14 días. Para una experiencia
                      completa, regístrate gratis.
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                onClick={() => onClose()}
              >
                Continuar como Invitado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
