# Security Checklist: Before Publishing Your Portfolio

**⚠️ CRITICAL: Review this checklist EVERY TIME before committing to main branch.**

This is a **public repository**. Everything in it will be visible to recruiters, security teams, and the internet. Double-check that you're not leaking sensitive information.

---

## ✅ Credentials & Secrets

- [ ] No passwords anywhere in the site
- [ ] No API keys in code, comments, or screenshots
- [ ] No OAuth tokens or credentials
- [ ] No SSH keys or private key references
- [ ] No AWS/GCP/Azure credentials or project IDs
- [ ] No Qwiklabs login credentials
- [ ] No private school/university credentials
- [ ] No database connection strings

**Search for these in code:**
```
password
apikey
api_key
token
secret
credential
access_key
private_key
```

---

## ✅ Cloud & Infrastructure

- [ ] No real AWS account IDs
- [ ] No real GCP project IDs
- [ ] No real Azure subscription IDs
- [ ] No cloud resource names that reveal internal structure
- [ ] No real S3 bucket names tied to your organization
- [ ] No cloud console screenshots with identifying info
- [ ] No real internal IP addresses (10.x.x.x, 172.x.x.x, 192.x.x.x)
- [ ] No public IP addresses of actual systems
- [ ] No VPN endpoints or gateway IPs
- [ ] No DNS server IPs that are identifiable

**Examples to avoid:**
```
prod-database-us-east-1
customer-data-bucket
internal-vpc-10.50.1.0/24
Real IPs: 192.168.1.100, 10.0.0.5
```

---

## ✅ Logs & Data

- [ ] No real security event logs
- [ ] No real incident data
- [ ] No customer data in any form
- [ ] No employee data or internal staff lists
- [ ] No real system usernames (especially domain accounts)
- [ ] No real computer names or hostnames
- [ ] No domain names of internal systems
- [ ] No active directory domain structure details
- [ ] No email addresses (except your own for contact)
- [ ] No phone numbers
- [ ] No real malware hashes or sample names tied to your org

---

## ✅ Screenshots

For all screenshots (Wazuh, ELK, GCP, Windows, etc.):

- [ ] No passwords visible in screenshots
- [ ] No API keys visible in screenshots
- [ ] No real internal IP addresses visible
- [ ] No real cloud project IDs visible
- [ ] No real customer or employee data visible
- [ ] No real incident data visible
- [ ] No domain controller names or internal domain visible
- [ ] No real computer names visible
- [ ] No real email addresses visible (except generic examples)
- [ ] No AWS/GCP/Azure console with real resources visible
- [ ] No real S3 bucket names or cloud storage paths
- [ ] No real GitHub tokens or personal access tokens
- [ ] No real application secrets or environment variables
- [ ] No SSH keys or certificate content visible
- [ ] No SSL/TLS certificate details that are real

**If needed, sanitize screenshots:**
- Replace real names with: `INTERNAL-SERVER`, `PRODUCTION-DB`, `CORP-DOMAIN`
- Replace real IPs with: `10.0.0.100`, `192.168.1.50` (private range examples)
- Blur or redact actual values while keeping the context

---

## ✅ File Content

- [ ] No .env files committed
- [ ] No .pem or .key files committed
- [ ] No .pfx or .p12 certificate files committed
- [ ] No config files with real credentials
- [ ] No database dumps
- [ ] No backup files with sensitive data
- [ ] No node_modules or dependencies containing secrets

**Don't add these files:**
```
.env
.env.local
.env.production
config/secrets.yml
aws-credentials.json
credentials.json
private-key.pem
certificate.pfx
database-backup.sql
```

---

## ✅ Comments & Documentation

- [ ] No commented-out credentials in code
- [ ] No TODO comments with sensitive info
- [ ] No debug comments with internal details
- [ ] No URLs to internal systems
- [ ] No internal wiki or documentation links
- [ ] No private Slack channel links
- [ ] No internal phone numbers or email lists

**Examples to remove:**
```javascript
// TODO: Add API_KEY='sk-1234567890' from LastPass
// Debug: Internal URL: https://internal-app.corp.local
// User: john.smith@company.com, Pass: Summer2024!
```

---

## ✅ External Links

- [ ] Links are to public resources only
- [ ] No links to internal systems
- [ ] No links to private GitHub repos
- [ ] No links to private cloud consoles
- [ ] GitHub link is to public profile/repo only
- [ ] LinkedIn link is to your public profile
- [ ] No links to lab environments that are still running
- [ ] No links to temporary/private services

---

## ✅ Project Descriptions

- [ ] Project descriptions don't reveal internal process details
- [ ] Descriptions don't mention real company names
- [ ] Descriptions don't mention real customers
- [ ] Descriptions don't mention real employee names
- [ ] Technical details are general enough to be public
- [ ] No overly specific details about production systems
- [ ] No details that could be used to social engineer

---

## ✅ Contact Information

- [ ] No personal phone number published
- [ ] No private email address (use "Available upon request")
- [ ] GitHub link is public account
- [ ] LinkedIn link is public profile
- [ ] Contact form (if any) doesn't collect data

---

## ✅ Repository Settings

- [ ] Repository is PUBLIC (✅ intentional choice)
- [ ] No .gitignore file with overly permissive rules
- [ ] No secrets in GitHub repo settings/environment variables
- [ ] No GitHub Actions secrets exposed
- [ ] No deployment keys with real access

---

## ✅ Meta Tags & SEO

- [ ] Meta descriptions don't mention internal systems
- [ ] No meta tags with real project details
- [ ] Title and description are professional and public

---

## ✅ Final Review

Before every commit:

1. **View site locally** - Open index.html in browser, check all sections
2. **Scan for sensitive data** - Use Ctrl+F to search for:
   - Real email addresses
   - Real phone numbers
   - Real IP addresses (non-example)
   - Real AWS/GCP IDs
   - Passwords or tokens
3. **Review changes** - `git diff` to see what's being committed
4. **Check file sizes** - Unusually large files might be secrets or binaries
5. **Ask yourself** - "Would I be comfortable sharing this with a recruiter? A security team? The internet?"

---

## ✅ If You Find a Mistake

**If you accidentally commit sensitive data:**

1. **IMMEDIATELY** force push a corrected version
2. **Do NOT just delete the file** - it stays in git history
3. **Use git filter-branch or BFG** to remove from history:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch filename' \
   --prune-empty --tag-name-filter cat -- --all
   
   git push --force
   ```
4. **If data is truly sensitive** (passwords, API keys):
   - Rotate the exposed credentials immediately
   - Contact GitHub support if needed
   - Review logs to see who accessed it

---

## ✅ Deployment Checklist

Right before you push to main:

- [ ] All images are in assets/ folder
- [ ] All links work correctly
- [ ] All placeholder text has been reviewed
- [ ] No console errors (check F12 developer tools)
- [ ] Mobile view tested (responsive design)
- [ ] All sections are readable and professional
- [ ] No broken internal links
- [ ] No 404 errors on page load
- [ ] Site works without JavaScript enabled
- [ ] Performance is acceptable (no huge uncompressed files)

---

## 🔍 Security Check Commands

Run these before committing:

```bash
# Search for common credential patterns
grep -r "password\|api_key\|apikey\|token\|secret" . --exclude-dir=.git

# Search for AWS account ID pattern (12 digits)
grep -rE "[0-9]{12}" . --exclude-dir=.git

# Search for private IP patterns
grep -rE "10\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" . --exclude-dir=.git

# Check file sizes (might catch hidden binaries)
find . -size +1M -type f
```

---

## ✅ Sign-Off

Before pushing, confirm:

- [ ] I have reviewed all content for sensitive information
- [ ] I have searched for credentials using the commands above
- [ ] I understand this repository is PUBLIC
- [ ] I am comfortable with all content being visible to recruiters and the internet
- [ ] I have checked the security checklist and found no issues
- [ ] I am ready to deploy

**Commit message:**
```
Add portfolio content - Security reviewed and safe to publish
```

---

## When to Re-Run This Checklist

✅ **EVERY time** you add:
- New project cards
- Screenshots or images
- Links to resources
- Contact information
- Updated skills or experience
- New code snippets or examples

✅ **Before every commit** to main branch

---

## Questions to Ask Yourself

> "Would I be comfortable if this appeared in a Google search?"

> "Could this information be used to compromise security?"

> "Does this reveal internal company/school details?"

> "Are there any real credentials visible?"

> "Could a social engineer use this information?"

If you answer **NO** to any of these → **Fix it before committing.**

---

## Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP: Sensitive Data Exposure](https://owasp.org/www-project-top-ten/)
- [Removing Sensitive Data from Git](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

---

**Last Updated:** 2025

**Remember:** Public = Safe. If you're unsure about something, leave it out. Better to be conservative with a portfolio than to leak credentials or private data.

Happy publishing! 🛡️
