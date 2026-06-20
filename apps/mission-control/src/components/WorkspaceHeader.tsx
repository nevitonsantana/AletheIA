type WorkspaceHeaderProps = { label: string; title: string; description: string; boundary: string };

export function WorkspaceHeader({ label, title, description, boundary }: WorkspaceHeaderProps) {
  return (
    <header className="workspace-header">
      <p className="workspace-label">{label}</p>
      <h2>{title}</h2>
      <p className="workspace-description">{description}</p>
      <p className="workspace-boundary"><strong>Projection boundary</strong><span>{boundary}</span></p>
    </header>
  );
}
