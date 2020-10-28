import React, { Suspense } from "react";

const AddEventComponent = React.lazy(() => import('../components/AddEvent'));

class AddEventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AddEventComponent />
      </Suspense>
    )
  }
}

export default AddEventPage
