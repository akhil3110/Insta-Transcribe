interface PageHeadersProps {
  h1Text: string;
  h2Text: string;
}

const PageHeaders = (
  {
    h1Text,
    h2Text
  }: PageHeadersProps
) => {
    return ( 
        <div className="text-center mt-32">
          <h1 className="text-4xl font-medium">
            {h1Text}
          </h1>
          <h2 className="text-white/75">
            {h2Text}
          </h2>
        </div>
     );
}
 
export default PageHeaders;