import React from 'react'
import swal from 'sweetalert';

const SigninAlert = () => {

  swal("Please Login first, thank you!", {
    icon: "info",
    button: false,
    timer: 2500,
  });

  return (
    <div></div>
  )
}

export default SigninAlert
