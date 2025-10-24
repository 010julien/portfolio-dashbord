import { ExternalLink, Database, Code } from 'lucide-react'

const Settings = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration et informations système
        </p>
      </div>

      {/* API Configuration */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Configuration API</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL de l'API</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={apiUrl}
                readOnly
                className="input-field flex-1"
              />
              <a
                href={`${apiUrl}/api/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4 inline mr-2" />
                Swagger Docs
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configuration définie dans .env (VITE_API_URL)
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              💡 Pour modifier l'URL de l'API
            </h3>
            <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Créez un fichier <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">.env</code> à la racine</li>
              <li>Ajoutez : <code className="bg-blue-100 dark:bg-blue-950 px-1 rounded">VITE_API_URL=http://localhost:3001</code></li>
              <li>Redémarrez le serveur de développement</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Informations Personnelles */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Informations du Portfolio</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <input
                type="text"
                defaultValue="ADOBOE Comlan Julien"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                defaultValue="Manager digital & Développeur"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              rows="3"
              defaultValue="Passionné par le développement web et le management de projets digitaux, je transforme les idées en solutions digitales innovantes."
              className="input-field"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="julien.adoboe@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input
                type="tel"
                defaultValue="+228 XX XX XX XX"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                className="input-field"
              />
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              ⚠️ <strong>Note :</strong> Ces paramètres sont pour référence uniquement. 
              Pour l'instant, modifiez directement les composants du portfolio frontend.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Liens rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium">Portfolio Frontend</span>
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={`${apiUrl}/api/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium">Documentation API</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Settings
