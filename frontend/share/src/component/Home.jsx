import React from 'react'

const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
  }
  const sizeStyles = {
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
)

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
)

const Icon = ({ name }) => {
  const icons = {
    Upload: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    Download: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    Clock: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  return icons[name] || null
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
   

      <main>
        <div className="container mx-auto px-4">
          <section className="py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Welcome to Just Share</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">Quick, easy, and secure file sharing without the hassle. Upload your files and share them instantly with anyone, anywhere.</p>
            <div className="flex justify-center space-x-4">
              <a href="/upload">
                <Button size="lg">
                  Upload a File
                </Button>
              </a>
              <a href="/download">
                <Button size="lg" variant="outline">
                  Download a File
                </Button>
              </a>
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent>
                  <div className="text-center">
                    <Icon name="Upload" />
                    <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">1. Upload</h3>
                    <p className="text-gray-600">Select your file and upload it to our secure servers.</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="text-center">
                    <Icon name="Clock" />
                    <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">2. Get Link</h3>
                    <p className="text-gray-600">Receive a unique download link for your file instantly.</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="text-center">
                    <Icon name="Download" />
                    <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">3. Share</h3>
                    <p className="text-gray-600">Share the link with anyone who needs to download your file.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16 bg-gray-200 rounded-lg">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">Why Choose Just Share?</h2>
              <ul className="text-left list-disc list-inside mb-8 text-gray-600">
                <li className="mb-2">No registration required - start sharing immediately</li>
                <li className="mb-2">Files are encrypted for maximum security</li>
                <li className="mb-2">Large file support - up to 2GB per file</li>
                <li className="mb-2">Files automatically delete after 7 days for your privacy</li>
                <li>Simple, clean interface - no technical knowledge needed</li>
              </ul>
              <a href="/upload">
                <Button size="lg">
                  Start Sharing Now
                </Button>
              </a>
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Is Just Share free to use?</h3>
                <p className="text-gray-600">Yes, Just Share is completely free for all users.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How long are my files stored?</h3>
                <p className="text-gray-600">Files are automatically deleted after 7 days to ensure privacy.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Is there a file size limit?</h3>
                <p className="text-gray-600">You can upload files up to 2GB in size.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Are my files secure?</h3>
                <p className="text-gray-600">Yes, all files are encrypted during transfer and storage.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      
    </div>
  )
}