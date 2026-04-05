import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import LegalDocLayout from '@/components/legal/LegalDocLayout';
import {
  LegalSection,
  LegalSubheading,
  LegalNotice,
  LegalTOC,
  LegalContactGrid,
} from '@/components/legal/LegalSection';

export default function BioBreakTermsPage() {
  return (
    <LegalDocLayout
      productName="Bio Break"
      title="Terms of Service"
      version="1.1"
      lastUpdated="March 30, 2026"
      effectiveDate="March 30, 2026"
      intro=""
    >
      <LegalNotice warning>
        <Typography variant="body2">
          <strong>Important Notice:</strong> These terms govern your use of Bio Break. By using the app, you agree to these terms. Please read them carefully. Bio Break is developed and operated by Big Freight Life LLC.
        </Typography>
      </LegalNotice>

      <LegalTOC
        items={[
          { id: 'acceptance', label: 'Acceptance of Terms' },
          { id: 'medical-disclaimer', label: 'Medical Disclaimer' },
          { id: 'privacy', label: 'Privacy & Data Protection' },
          { id: 'ai-features', label: 'AI-Powered Features' },
          { id: 'community-features', label: 'Community Features' },
          { id: 'subscription', label: 'Subscription Terms' },
          { id: 'license', label: 'License & Intellectual Property' },
          { id: 'conduct', label: 'User Conduct' },
          { id: 'liability', label: 'Limitation of Liability' },
          { id: 'indemnification', label: 'Indemnification' },
          { id: 'termination', label: 'Termination' },
          { id: 'governing-law', label: 'Governing Law' },
        ]}
      />

      {/* 1. Acceptance of Terms */}
      <LegalSection id="acceptance" title="1. Acceptance of Terms">
        <Typography variant="body1">
          By downloading, installing, accessing, or using Bio Break (&ldquo;the App&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </Typography>
        <Box component="ul">
          <li>Downloading or installing the App constitutes your acceptance of these terms</li>
          <li>If you are using the App on behalf of an organization, you represent that you have the authority to bind that organization to these terms</li>
          <li>We reserve the right to update these terms at any time; your continued use after changes constitutes acceptance</li>
          <li>If you do not agree to these terms, you must discontinue use of the App immediately</li>
        </Box>
      </LegalSection>

      {/* 2. Medical Disclaimer */}
      <LegalSection id="medical-disclaimer" title="2. Medical Disclaimer">
        <LegalNotice warning>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Critical Warning
          </Typography>
          <Typography variant="body2">
            Bio Break is provided for informational and tracking purposes only. The App is NOT a medical device and is not intended to diagnose, treat, cure, or prevent any disease or health condition.
          </Typography>
        </LegalNotice>

        <LegalSubheading>Not a Medical Device</LegalSubheading>
        <Typography variant="body1">
          Bio Break is not FDA approved, cleared, or registered as a medical device. The Bristol Stool Scale, urine color references, and any health insights provided through the App should not be considered medical advice.
        </Typography>

        <LegalSubheading>Professional Consultation Required</LegalSubheading>
        <Box component="ul">
          <li>The App does not replace professional medical consultation, diagnosis, or treatment</li>
          <li>Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition</li>
          <li>Never disregard professional medical advice or delay seeking it because of information obtained through the App</li>
        </Box>

        <LegalSubheading>Emergency Situations</LegalSubheading>
        <Typography variant="body1">
          <strong>In case of medical emergency, immediately call 911 or your local emergency services.</strong> Do not use the App for emergency medical situations.
        </Typography>
      </LegalSection>

      {/* 3. Privacy & Data Protection */}
      <LegalSection id="privacy" title="3. Privacy & Data Protection">
        <Typography variant="body1">
          Your privacy is fundamental to our service. Please review our{' '}
          <Link href="/legal/bio-break-privacy">Privacy Policy</Link> for complete details.
        </Typography>

        <LegalSubheading>Key Commitments</LegalSubheading>
        <Box component="ul">
          <li><strong>Private by Default:</strong> All data is stored locally on your device with iOS Data Protection encryption</li>
          <li><strong>No Tracking:</strong> We do not use third-party behavioral analytics, advertising SDKs, or tracking of any kind</li>
          <li><strong>No Data Selling:</strong> We will never sell your personal health information to third parties</li>
          <li><strong>Data Ownership:</strong> You own your health data; we are custodians, not owners</li>
          <li><strong>Export &amp; Deletion:</strong> You can export or delete your data at any time</li>
          <li><strong>Account Deletion:</strong> Pro users can delete their account and all server-side data through the app</li>
        </Box>

        <LegalSubheading>Third-Party Services</LegalSubheading>
        <Typography variant="body1">The App uses the following third-party services:</Typography>
        <Box component="ul">
          <li><strong>Convex:</strong> Cloud backend for Pro subscriber data sync</li>
          <li><strong>Google Gemini API:</strong> AI-powered features (Pro only) — Google does not use paid API tier data for model training</li>
          <li><strong>Firebase Crashlytics:</strong> Crash reporting and diagnostics</li>
        </Box>
        <Typography variant="body1">
          For full details, see our <Link href="/legal/bio-break-privacy">Privacy Policy</Link>.
        </Typography>
      </LegalSection>

      {/* 4. AI-Powered Features */}
      <LegalSection id="ai-features" title="4. AI-Powered Features">
        <Typography variant="body1">
          Bio Break offers optional AI-powered features for Pro subscribers, including conversational logging, pattern detection, health Q&amp;A, proactive nudges, and report narratives.
        </Typography>

        <LegalNotice warning>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            AI Disclaimer
          </Typography>
          <Typography variant="body2">
            AI responses are generated by Google&apos;s Gemini API and are for <strong>informational purposes only</strong>. AI responses do not constitute medical advice, diagnosis, or treatment. Do not rely on AI-generated content for medical decisions. Always consult a healthcare professional for medical concerns.
          </Typography>
        </LegalNotice>

        <LegalSubheading>AI Features Terms</LegalSubheading>
        <Box component="ul">
          <li>AI features are optional and can be disabled at any time</li>
          <li>When using AI features, a summary of your recent health data is sent to our secure backend for processing via Google&apos;s Gemini API</li>
          <li>Google does not use paid API tier data for model training</li>
          <li>AI features will never claim to diagnose, treat, cure, or prevent any disease</li>
          <li>You should not rely on AI-generated content as a substitute for professional medical advice</li>
        </Box>

        <LegalSubheading>Account &amp; Data</LegalSubheading>
        <Box component="ul">
          <li>Pro features require Sign in with Apple</li>
          <li>You can export your data before deleting your account</li>
          <li>Account deletion permanently removes all server-side data</li>
        </Box>
      </LegalSection>

      {/* 5. Community Features */}
      <LegalSection id="community-features" title="5. Community Features">
        <Typography variant="body1">
          Bio Break offers optional Community Stats that let you compare your patterns against anonymous, aggregated community averages.
        </Typography>

        <LegalSubheading>Community Stats (Opt-In)</LegalSubheading>
        <Box component="ul">
          <li>Community Stats is entirely optional and disabled by default</li>
          <li>If enabled, only fully anonymized and aggregated data is shared</li>
          <li>No personally identifiable information is ever included</li>
          <li>You can opt out at any time in the app settings</li>
        </Box>

        <LegalSubheading>Limitations</LegalSubheading>
        <Box component="ul">
          <li>Community statistics are for informational purposes only</li>
          <li>Averages reflect contributing users and may not represent the general population</li>
          <li>Do not use community comparisons as a basis for medical decisions</li>
        </Box>
      </LegalSection>

      {/* 6. Subscription Terms */}
      <LegalSection id="subscription" title="6. Subscription Terms">
        <LegalSubheading>Subscription Tiers</LegalSubheading>
        <Typography variant="body1">
          Bio Break offers a free tier and a Pro subscription with additional features. Current tier information is available within the App.
        </Typography>

        <LegalSubheading>Billing Terms</LegalSubheading>
        <Box component="ul">
          <li>Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period</li>
          <li>Payment is processed through Apple&apos;s iTunes Account at confirmation of purchase</li>
          <li>Subscription management and cancellation is available through your App Store account settings</li>
          <li>Refunds are subject to Apple&apos;s App Store refund policies</li>
        </Box>
      </LegalSection>

      {/* 7. License & Intellectual Property */}
      <LegalSection id="license" title="7. License & Intellectual Property">
        <LegalSubheading>Limited License</LegalSubheading>
        <Typography variant="body1">
          Big Freight Life LLC grants you a limited, non-exclusive, non-transferable, revocable license to use the App solely for personal, non-commercial purposes in accordance with these terms.
        </Typography>

        <LegalSubheading>Ownership</LegalSubheading>
        <Box component="ul">
          <li>All content, features, functionality, code, designs, and intellectual property within the App are owned by Big Freight Life LLC</li>
          <li>The App is protected by copyright, trademark, and other intellectual property laws</li>
          <li>You may not reproduce, distribute, modify, or create derivative works without express written permission</li>
        </Box>

        <LegalSubheading>Trademark Protection</LegalSubheading>
        <Typography variant="body1">
          &ldquo;Bio Break&rdquo; and associated logos and branding are trademarks of Big Freight Life LLC. Unauthorized use is prohibited.
        </Typography>
      </LegalSection>

      {/* 8. User Conduct */}
      <LegalSection id="conduct" title="8. User Conduct">
        <Typography variant="body1">By using the App, you agree to:</Typography>
        <Box component="ul">
          <li>Use the App only for lawful purposes and in accordance with these terms</li>
          <li>Provide accurate and truthful information when using the App</li>
          <li>Not attempt to gain unauthorized access to any portion of the App or its systems</li>
          <li>Not use automated systems or software to extract data from the App</li>
          <li>Not reverse engineer, decompile, or disassemble the App</li>
        </Box>
        <Typography variant="body1">
          Violations of these conduct requirements may result in immediate termination of your access to the App.
        </Typography>
      </LegalSection>

      {/* 9. Limitation of Liability */}
      <LegalSection id="liability" title="9. Limitation of Liability">
        <LegalSubheading>Exclusion of Damages</LegalSubheading>
        <Typography variant="body1">
          To the maximum extent permitted by law, Big Freight Life LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
        </Typography>
        <Box component="ul">
          <li>Loss of profits, revenue, or anticipated savings</li>
          <li>Loss of data or data corruption</li>
          <li>Loss of goodwill or reputation</li>
          <li>Any health-related outcomes from use of the App</li>
        </Box>

        <LegalSubheading>Maximum Liability</LegalSubheading>
        <Typography variant="body1">
          Big Freight Life LLC&apos;s total cumulative liability shall not exceed the amount you paid for the App in the twelve (12) months preceding any claim.
        </Typography>

        <LegalSubheading>No Guarantee of Operation</LegalSubheading>
        <Typography variant="body1">
          We do not guarantee uninterrupted or error-free operation of the App. The App is provided &ldquo;as is&rdquo; without warranties of any kind.
        </Typography>
      </LegalSection>

      {/* 10. Indemnification */}
      <LegalSection id="indemnification" title="10. Indemnification">
        <Typography variant="body1">
          You agree to defend, indemnify, and hold harmless Big Freight Life LLC, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from:
        </Typography>
        <Box component="ul">
          <li>Your use of the App</li>
          <li>Your violation of these terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Any content you submit or transmit through the App</li>
        </Box>
        <Typography variant="body1">
          This indemnification obligation survives the termination of these terms and your use of the App.
        </Typography>
      </LegalSection>

      {/* 11. Termination */}
      <LegalSection id="termination" title="11. Termination">
        <LegalSubheading>Termination by Us</LegalSubheading>
        <Typography variant="body1">
          We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason, including breach of these terms.
        </Typography>

        <LegalSubheading>Termination by You</LegalSubheading>
        <Typography variant="body1">
          You may terminate your use of the App at any time by uninstalling the App and cancelling any active subscriptions through the App Store.
        </Typography>

        <LegalSubheading>Effect of Termination</LegalSubheading>
        <Box component="ul">
          <li>Upon termination, your right to use the App ceases immediately</li>
          <li>Uninstalling the App removes your local data from the device</li>
          <li>Pro users can delete their account and all server-side data through Profile &gt; Account settings before uninstalling</li>
          <li>iCloud synced data can be managed through your iCloud settings</li>
          <li>Provisions that by their nature should survive termination will remain in effect</li>
        </Box>
      </LegalSection>

      {/* 12. Governing Law & Dispute Resolution */}
      <LegalSection id="governing-law" title="12. Governing Law & Dispute Resolution">
        <LegalSubheading>Governing Law</LegalSubheading>
        <Typography variant="body1">
          These Terms are governed by and construed in accordance with the laws of the United States and the State of Texas, without regard to conflict of law principles.
        </Typography>

        <LegalSubheading>Binding Arbitration</LegalSubheading>
        <Typography variant="body1">
          Any dispute arising out of or relating to these terms or the App shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules.
        </Typography>

        <LegalSubheading>Waiver of Rights</LegalSubheading>
        <Box component="ul">
          <li><strong>Jury Trial Waiver:</strong> You waive any right to a jury trial in any proceeding arising out of these terms</li>
          <li><strong>Class Action Waiver:</strong> You waive any right to participate in a class action lawsuit or class-wide arbitration; all claims must be brought individually</li>
        </Box>

        <LegalSubheading>Exceptions</LegalSubheading>
        <Typography variant="body1">
          Claims that qualify for small claims court are exempt from the arbitration requirement.
        </Typography>
      </LegalSection>

      {/* Contact */}
      <LegalSection id="contact" title="Contact Information">
        <Typography variant="body1">
          For questions about these Terms of Service, please visit our support page:
        </Typography>
        <LegalContactGrid
          items={[
            {
              label: 'Support',
              content: <Link href="/support/bio-break">bfl.design/support/bio-break</Link>,
            },
            {
              label: 'Mailing Address',
              content: (
                <>
                  Big Freight Life LLC
                  <br />
                  1351 N Buckner Blvd #180397
                  <br />
                  Dallas, TX 75218, USA
                </>
              ),
            },
          ]}
        />
      </LegalSection>
    </LegalDocLayout>
  );
}
