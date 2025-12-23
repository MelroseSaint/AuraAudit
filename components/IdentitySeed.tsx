export default function IdentitySeed({ profile }: { profile: { name: string, title: string, verifiedBio: string, id: string } }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.title,
        description: profile.verifiedBio,
        url: `https://auraaudit.com/u/${profile.id}`,
        knowsAbout: ['code audit', 'security analysis', 'AI verification'],
      })}
    </script>
  )
}
