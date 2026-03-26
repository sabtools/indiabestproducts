'use client';

import SpecsTable from '@/components/product/SpecsTable';

interface Props {
  specs: Record<string, string>;
}

export default function SpecsSection({ specs }: Props) {
  return <SpecsTable specs={specs} title="Full Specifications" />;
}
