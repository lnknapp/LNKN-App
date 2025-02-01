interface PageRendererProps {
  page: any;
}

const PageRenderer = ({ page } : PageRendererProps) => {
  const theme = page.theme ? JSON.parse(page.theme) : {};
  const backgroundColor = theme.backgroundColor || '#ffffff';
  const fontFamily = theme.fontFamily || 'Arial, sans-serif';

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor, fontFamily, minHeight: '100vh' }}>
      <div className="text-xl text-center my-5 font-bold">{page?.name}</div>
      <h1>{page?.name}</h1>
    </div>
  );
};

export default PageRenderer;
