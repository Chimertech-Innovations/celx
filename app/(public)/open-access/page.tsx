export const metadata = { title: 'Open Access Policy' }

export default function OpenAccessPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Open Access Policy</h1>
        <p className="text-slate-500 mt-2 text-sm">Empowering global research dissemination through open and free science</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          At CleX, we believe that high-quality scientific research should be freely accessible to everyone, anywhere in the world. Our open-access policies are designed to maximize the visibility, citation, and impact of published research.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Gold Open Access</h2>
        <p>
          All articles published in CleX journals are fully open access (Gold Open Access). 
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Free Accessibility:</strong> Upon publication, all articles are immediately and permanently free to read, download, copy, distribute, and print.</li>
          <li><strong>Author Copyright:</strong> Authors retain the copyright to their work, licensing it under a Creative Commons license.</li>
          <li><strong>No Paywalls:</strong> Readers do not need a subscription, institutional login, or individual payment to access full texts.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Creative Commons Licensing</h2>
        <p>
          Most CleX articles are published under the <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong> license. Under this license:
        </p>
        <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-500 my-4">
          "Others can distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you for the original creation."
        </blockquote>
        <p>
          Other licensing options (such as CC BY-NC for non-commercial use) are available during the submission process depending on the author's preference or funding requirements.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Benefits of Open Access</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Higher Visibility:</strong> Open-access papers receive more downloads and citations than paywalled content.</li>
          <li><strong>Faster Scientific Progress:</strong> Immediate access accelerates the research cycle and fosters collaboration.</li>
          <li><strong>Funder Compliance:</strong> Meets the open-access mandates of major international funders (e.g., NIH, Wellcome Trust, European Commission).</li>
        </ul>
      </div>
    </div>
  )
}
