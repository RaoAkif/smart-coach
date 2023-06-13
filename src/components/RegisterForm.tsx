import "./registerFormStyle.css"

const Form = () => {
  return (
    <div id="wrapper">
        <div id="main">
            <div id="form-div">
                <div id="form-top-section">
                    <h1 id='h1'>Create Account</h1>
                </div>
                <p id="or-div">OR</p>
                <form id="form" action="">
                    <input name="name" type="text" placeholder="Full Name" />
                    <input name="email" type="email" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button>Create Account</button>
                    <p id="already-had-account">Already have an account? <a href="./login">Login</a></p>
                </form>
            </div>
            <div id="vertical-rl">Company</div>
        </div>
    </div>
  )
}

export default Form