import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Darkei Elyahou - Actions sociales et Torah pour la communauté francophone en Israël';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Darkei Elyahou
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'white',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Actions sociales et Torah pour la communauté francophone en Israël
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'white',
            opacity: 0.8,
            marginTop: 40,
            display: 'flex',
            gap: 40,
          }}
        >
          <span>6 Kollelim</span>
          <span>•</span>
          <span>2 GMA'H</span>
          <span>•</span>
          <span>500+ familles aidées</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}