// import React from 'react';



// export const withFetch = props => WrappedComponent => class extends React.Component {
//     state = {
//       isLoading: false,
//       hasError: false,
//       data: []
//     };

//     componentDidMount() {
//       this.getData();
//     }

//     getData() {
//       this.setState({ ...this.state, hasError: false, isLoading: true });

//       fetch(props)
//         .then((res) => res.json())
//         .then((data) =>
//           this.setState({ ...this.state, data, isLoading: false })
//         )
//         .catch((e) => {
//           this.setState({ ...this.state, hasError: true, isLoading: false });
//         });
//     }

//     render() {
//       const { data } = this.state;
//       return (
//     
//       )
//     }
// };

