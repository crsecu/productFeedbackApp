import { ComponentType } from "react";
import { LoaderDataType } from "../types/feedback.types";
import { useLoaderData } from "react-router-dom";

/* this component reads data from loader function and passes it down to the page component
    - props: the page component for which we need loader data
              *** for type safety, the component passed in as prop should accept one of the following props:
                   -- FeedbackBoardLoaderData
                   -- FeedbackType (Feedback Detail Page)
                   -- RoadmapLoaderData (Roadmap Page)

    - returns the page component with loader data as its prop
*/
interface DataProviderProps<T extends LoaderDataType> {
  PageComponent: ComponentType<{ dataFromLoader: T }>;
}

function DataProvider<T extends LoaderDataType>({
  PageComponent,
}: DataProviderProps<T>): React.JSX.Element {
  const data = useLoaderData() as T;

  return <PageComponent dataFromLoader={data} />;
}

export default DataProvider;
