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

export default function LowOxLifeTermsPage() {
  return (
    <LegalDocLayout
      productName="Low Ox Life"
      title="Terms of Service"
      version="3.0"
      lastUpdated="January 13, 2025"
      effectiveDate="February 1, 2025"
      intro=""
    >
      <LegalNotice warning>
        <Typography variant="body2">
          <strong>Important Notice:</strong> These terms govern your use of Low Ox Life. By using
          the app, you agree to these terms. Please read them carefully. Low Ox Life is developed and
          operated by Big Freight Life LLC.
        </Typography>
      </LegalNotice>

      <LegalTOC
        items={[
          { id: 'acceptance', label: 'Acceptance of Terms' },
          { id: 'medical-disclaimer', label: 'Medical Disclaimer' },
          { id: 'privacy', label: 'Privacy & Data Protection' },
          { id: 'ai-features', label: 'AI-Assisted Features' },
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
          By downloading, installing, accessing, or using Low Ox Life (&ldquo;the App&rdquo;), you
          acknowledge that you have read, understood, and agree to be bound by these Terms of
          Service.
        </Typography>
        <Box component="ul">
          <li>
            Downloading or installing the App constitutes your acceptance of these terms
          </li>
          <li>
            If you are using the App on behalf of an organization, you represent that you have the
            authority to bind that organization to these terms
          </li>
          <li>
            We reserve the right to update these terms at any time; your continued use after changes
            constitutes acceptance
          </li>
          <li>
            If you do not agree to these terms, you must discontinue use of the App immediately
          </li>
        </Box>
      </LegalSection>

      {/* 2. Medical Disclaimer */}
      <LegalSection id="medical-disclaimer" title="2. Medical Disclaimer">
        <LegalNotice warning>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Critical Warning
          </Typography>
          <Typography variant="body2">
            Low Ox Life is provided for educational and informational purposes only. The App is NOT a
            medical device and is not intended to diagnose, treat, cure, or prevent any disease or
            health condition.
          </Typography>
        </LegalNotice>

        <LegalSubheading>Not a Medical Device</LegalSubheading>
        <Typography variant="body1">
          Low Ox Life is not FDA approved, cleared, or registered as a medical device. The
          information provided through the App should not be considered medical advice.
        </Typography>

        <LegalSubheading>Professional Consultation Required</LegalSubheading>
        <Box component="ul">
          <li>
            The App does not replace professional medical consultation, diagnosis, or treatment
          </li>
          <li>
            Always seek the advice of your physician or other qualified health provider with any
            questions you may have regarding a medical condition
          </li>
          <li>
            Never disregard professional medical advice or delay seeking it because of information
            obtained through the App
          </li>
        </Box>

        <LegalSubheading>Emergency Situations</LegalSubheading>
        <Typography variant="body1">
          <strong>
            In case of medical emergency, immediately call 911 or your local emergency services.
          </strong>{' '}
          Do not use the App for emergency medical situations.
        </Typography>
      </LegalSection>

      {/* 3. Privacy & Data Protection */}
      <LegalSection id="privacy" title="3. Privacy & Data Protection">
        <Typography variant="body1">
          Your privacy is fundamental to our service. Please review our{' '}
          <Link href="/legal/low-ox-life-privacy">Privacy Policy</Link> for complete details.
        </Typography>

        <LegalSubheading>Key Commitments</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Industry-Standard Encryption:</strong> We use industry-standard encryption to
            protect your data in transit and at rest
          </li>
          <li>
            <strong>Data Ownership:</strong> You own your health data; we are custodians, not owners
          </li>
          <li>
            <strong>No Data Selling:</strong> We will never sell your personal health information to
            third parties
          </li>
          <li>
            <strong>Export & Deletion Rights:</strong> You have the right to export or delete your
            data at any time through App settings
          </li>
        </Box>
      </LegalSection>

      {/* 4. AI-Assisted Features */}
      <LegalSection id="ai-features" title="4. AI-Assisted Features">
        <Typography variant="body1">
          Low Ox Life incorporates artificial intelligence to enhance your experience. These features
          are designed to assist, not replace, your own judgment and professional medical advice.
        </Typography>

        <LegalSubheading>AI-Powered Capabilities</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Food Import Assistance:</strong> AI helps analyze and categorize foods during
            import processes
          </li>
          <li>
            <strong>Health Insights:</strong> AI-generated insights based on your tracked data (Elite
            tier)
          </li>
          <li>
            <strong>Oscar AI Chat:</strong> Conversational AI assistant for oxalate-related questions
            (Elite tier)
          </li>
        </Box>

        <LegalSubheading>Important Limitations</LegalSubheading>
        <Box component="ul">
          <li>
            AI-generated content is for informational purposes only and is NOT medical advice
          </li>
          <li>AI may occasionally provide inaccurate or incomplete information</li>
          <li>Always verify AI-generated information with qualified healthcare providers</li>
          <li>You can control AI feature access through Privacy settings in the App</li>
        </Box>
      </LegalSection>

      {/* 5. Subscription Terms */}
      <LegalSection id="subscription" title="5. Subscription Terms">
        <LegalSubheading>Subscription Tiers</LegalSubheading>
        <Typography variant="body1">
          Low Ox Life offers multiple subscription tiers with varying features and pricing. Current
          tier information is available within the App.
        </Typography>

        <LegalSubheading>Billing Terms</LegalSubheading>
        <Box component="ul">
          <li>
            Subscriptions automatically renew unless cancelled at least 24 hours before the end of
            the current period
          </li>
          <li>
            Payment is processed through Apple&apos;s iTunes Account at confirmation of purchase
          </li>
          <li>
            Subscription management and cancellation is available through your App Store account
            settings
          </li>
          <li>Refunds are subject to Apple&apos;s App Store refund policies</li>
        </Box>
      </LegalSection>

      {/* 6. License & Intellectual Property */}
      <LegalSection id="license" title="6. License & Intellectual Property">
        <LegalSubheading>Limited License</LegalSubheading>
        <Typography variant="body1">
          Big Freight Life LLC grants you a limited, non-exclusive, non-transferable, revocable
          license to use the App solely for personal, non-commercial purposes in accordance with
          these terms.
        </Typography>

        <LegalSubheading>Ownership</LegalSubheading>
        <Box component="ul">
          <li>
            All content, features, functionality, code, designs, and intellectual property within the
            App are owned by Big Freight Life LLC
          </li>
          <li>
            The App is protected by copyright, trademark, and other intellectual property laws
          </li>
          <li>
            You may not reproduce, distribute, modify, or create derivative works without express
            written permission
          </li>
        </Box>

        <LegalSubheading>Trademark Protection</LegalSubheading>
        <Typography variant="body1">
          &ldquo;Low Ox Life,&rdquo; &ldquo;Oscar AI,&rdquo; and associated logos and branding are
          trademarks of Big Freight Life LLC. Unauthorized use is prohibited.
        </Typography>
      </LegalSection>

      {/* 7. User Conduct */}
      <LegalSection id="conduct" title="7. User Conduct">
        <Typography variant="body1">By using the App, you agree to:</Typography>
        <Box component="ul">
          <li>Use the App only for lawful purposes and in accordance with these terms</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Provide accurate and truthful information when using the App</li>
          <li>
            Not attempt to gain unauthorized access to any portion of the App or its systems
          </li>
          <li>Not use automated systems or software to extract data from the App</li>
        </Box>
        <Typography variant="body1">
          Violations of these conduct requirements may result in immediate termination of your
          account and access to the App.
        </Typography>
      </LegalSection>

      {/* 8. Limitation of Liability */}
      <LegalSection id="liability" title="8. Limitation of Liability">
        <LegalSubheading>Exclusion of Damages</LegalSubheading>
        <Typography variant="body1">
          To the maximum extent permitted by law, Big Freight Life LLC shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including but not
          limited to:
        </Typography>
        <Box component="ul">
          <li>Loss of profits, revenue, or anticipated savings</li>
          <li>Loss of data or data corruption</li>
          <li>Loss of goodwill or reputation</li>
          <li>Any health-related outcomes from use of the App</li>
        </Box>

        <LegalSubheading>Maximum Liability</LegalSubheading>
        <Typography variant="body1">
          Big Freight Life LLC&apos;s total cumulative liability shall not exceed the amount you paid
          for the App in the twelve (12) months preceding any claim.
        </Typography>

        <LegalSubheading>No Guarantee of Operation</LegalSubheading>
        <Typography variant="body1">
          We do not guarantee uninterrupted or error-free operation of the App. The App is provided
          &ldquo;as is&rdquo; without warranties of any kind.
        </Typography>
      </LegalSection>

      {/* 9. Indemnification */}
      <LegalSection id="indemnification" title="9. Indemnification">
        <Typography variant="body1">
          You agree to defend, indemnify, and hold harmless Big Freight Life LLC, its officers,
          directors, employees, agents, and affiliates from and against any and all claims, damages,
          obligations, losses, liabilities, costs, and expenses arising from:
        </Typography>
        <Box component="ul">
          <li>Your use of the App</li>
          <li>Your violation of these terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Any content you submit or transmit through the App</li>
        </Box>
        <Typography variant="body1">
          This indemnification obligation survives the termination of these terms and your use of the
          App.
        </Typography>
      </LegalSection>

      {/* 10. Termination */}
      <LegalSection id="termination" title="10. Termination">
        <LegalSubheading>Termination by Us</LegalSubheading>
        <Typography variant="body1">
          We may terminate or suspend your access to the App immediately, without prior notice or
          liability, for any reason, including breach of these terms.
        </Typography>

        <LegalSubheading>Termination by You</LegalSubheading>
        <Typography variant="body1">
          You may terminate your use of the App at any time by uninstalling the App and cancelling
          any active subscriptions through the App Store.
        </Typography>

        <LegalSubheading>Effect of Termination</LegalSubheading>
        <Box component="ul">
          <li>Upon termination, your right to use the App ceases immediately</li>
          <li>
            Your data will be deleted after the applicable retention period as described in our
            Privacy Policy
          </li>
          <li>
            Provisions that by their nature should survive termination will remain in effect
          </li>
        </Box>
      </LegalSection>

      {/* 11. Governing Law & Dispute Resolution */}
      <LegalSection id="governing-law" title="11. Governing Law & Dispute Resolution">
        <LegalSubheading>Governing Law</LegalSubheading>
        <Typography variant="body1">
          These Terms are governed by and construed in accordance with the laws of the United States
          and the State of Texas, without regard to conflict of law principles.
        </Typography>

        <LegalSubheading>Binding Arbitration</LegalSubheading>
        <Typography variant="body1">
          Any dispute arising out of or relating to these terms or the App shall be resolved through
          binding arbitration administered by the American Arbitration Association (AAA) in
          accordance with its Commercial Arbitration Rules.
        </Typography>

        <LegalSubheading>Waiver of Rights</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Jury Trial Waiver:</strong> You waive any right to a jury trial in any
            proceeding arising out of these terms
          </li>
          <li>
            <strong>Class Action Waiver:</strong> You waive any right to participate in a class
            action lawsuit or class-wide arbitration; all claims must be brought individually
          </li>
        </Box>

        <LegalSubheading>Exceptions</LegalSubheading>
        <Typography variant="body1">
          Claims that qualify for small claims court are exempt from the arbitration requirement.
        </Typography>
      </LegalSection>

      {/* Contact Information */}
      <LegalSection id="contact" title="Contact Information">
        <Typography variant="body1" sx={{ mb: 3 }}>
          For questions about these Terms of Service, please visit our support page:
        </Typography>
        <LegalContactGrid
          items={[
            {
              label: 'Support',
              content: (
                <a
                  href="https://bflux.co/support/low-ox-life/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bflux.co/support/low-ox-life/
                </a>
              ),
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
