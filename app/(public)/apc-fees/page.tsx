import { Card, CardContent } from '@/components/ui/index'

export const metadata = { title: 'Article Processing Charges (APC)' }

export default function ApcFeesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Article Processing Charges (APC)</h1>
        <p className="text-slate-500 mt-2 text-sm">Transparent pricing for open-access publishing operations</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          Publishing open-access articles requires resources for peer-review management, professional copyediting, typesetting, XML conversion, hosting, and permanent archiving. To cover these costs, CleX journals charge an Article Processing Charge (APC) upon acceptance of a manuscript.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-900">
          <strong>Key Policy:</strong> There are no submission fees. APC is charged ONLY if your manuscript is accepted for publication after rigorous peer review. Payment of the APC does not guarantee acceptance or influence the editorial process.
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Standard APC Pricing by Journal</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Journal</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Standard APC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-2 font-medium">Journal of Biomedical and Translational Research</td>
                <td className="px-4 py-2">$850 USD</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Journal of Agricultural and Veterinary Sciences</td>
                <td className="px-4 py-2">$750 USD</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Journal of Engineering, AI and Applied Technologies</td>
                <td className="px-4 py-2">$950 USD</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Journal of Public Health and Clinical Studies</td>
                <td className="px-4 py-2">$800 USD</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Student Journal of Emerging Research</td>
                <td className="px-4 py-2">$200 USD (Free with student waiver)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Waivers and Discounts</h2>
        <p>
          We are committed to supporting researchers from low- and middle-income countries. Automated 100% waivers are available to corresponding authors based in Research4Life Group A countries, and 50% discounts for Group B.
        </p>
        <p>
          Discretionary waivers can also be requested for financial hardship or student authors. All waiver requests must be submitted during the initial manuscript submission process.
        </p>
      </div>
    </div>
  )
}
