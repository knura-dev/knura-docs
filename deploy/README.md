# Publishing docs.knura.io

The site is plain files in a private S3 bucket, served by CloudFront at `docs.knura.io`. GitHub
Actions builds it on every pull request and publishes it on every push to `main`. It signs in to
AWS with a short-lived token, so no AWS keys are stored in GitHub.

`docs-site.yaml` sets all of this up in one go: the bucket, CloudFront, the HTTPS certificate, the
`docs.knura.io` DNS records and the role GitHub uses. It goes in the **knura-web** account, next
to the knura.io zone.

Expected cost: well under $1 a month (S3 storage, CloudFront requests; the certificate is free).

## One-time setup

**Wait for the knura.io move first.** The stack adds DNS records to the knura.io zone in
knura-web, so only run it once the registrar points at that zone. Check from any terminal:

```sh
dig +short NS knura.io
```

All four answers should be the knura-web name servers (`ns-1289…`, `ns-1581…`, `ns-737…`,
`ns-110…`). If they aren't yet, wait and check again later.

1. **Open CloudShell in knura-web.** Sign in at your AWS access portal, open the **knura-web**
   account, and set the region (top right) to **US East (N. Virginia) us-east-1**. CloudFront
   only accepts certificates from that region. Click the CloudShell icon (`>_`) at the top.

2. **Check for GitHub's sign-in provider.** Run:

   ```sh
   aws iam list-open-id-connect-providers
   ```

   If the list is empty, go on. If it shows one ending in `token.actions.githubusercontent.com`,
   add `CreateGitHubProvider=false` to the `--parameter-overrides` in step 3.

3. **Create the stack.** Paste:

   ```sh
   curl -sSO https://raw.githubusercontent.com/knura-dev/knura-docs/main/deploy/docs-site.yaml
   aws cloudformation deploy --region us-east-1 --stack-name knura-docs \
     --template-file docs-site.yaml --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides HostedZoneId=Z0482734NY8WQH697WIS
   ```

   It takes 5 to 15 minutes, mostly waiting for the certificate and CloudFront. It ends with
   `Successfully created/updated stack - knura-docs`.

4. **Copy the three values it made.** Run:

   ```sh
   aws cloudformation describe-stacks --region us-east-1 --stack-name knura-docs \
     --query "Stacks[0].Outputs[].[OutputKey,OutputValue]" --output table
   ```

5. **Give them to GitHub.** On github.com, open **knura-dev/knura-docs → Settings → Secrets and
   variables → Actions → Variables** tab, and click **New repository variable** three times:

   | Name | Value (from step 4) |
   | --- | --- |
   | `DOCS_ROLE_ARN` | `RoleArn` |
   | `DOCS_BUCKET` | `BucketName` |
   | `DOCS_DISTRIBUTION_ID` | `DistributionId` |

   These aren't secrets: the role only trusts runs on this repository's `main` branch.

6. **Publish.** Open the **Actions** tab, pick **Docs** on the left, click **Run workflow**, keep
   `main` and click the green button. When both jobs are green, open https://docs.knura.io.

From then on, every change merged into `main` is live a minute or two later.

## How it fits together

- Pages are built as flat files (`tags/claim-a-tag.html`) and linked without `.html`. A small
  CloudFront Function adds `.html` back on each request.
- Hashed files in `_astro/` are cached for a year; pages for 5 minutes, and each publish clears
  CloudFront's cache.
- The bucket keeps old versions of changed files for 30 days, so a bad publish can be undone by
  re-running an older workflow run (Actions → Docs → the run → Re-run all jobs).
- The publish role can only write to this bucket and clear this distribution's cache.

## Undoing it

Empty the bucket first (S3 console → the bucket → Empty), then delete the `knura-docs` stack in
CloudFormation. That removes the site, the certificate and the DNS records.
