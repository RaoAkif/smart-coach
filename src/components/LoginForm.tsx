import "./loginFormStyle.css"

const Form = () => {
  return (
    <div id="wrapper">
        <div id="main">
            <div id="form-div">
                <div id="form-top-section">
                    <h1 id='h1'>Sign In</h1>
                    <div className='log-buttons'>
                    </div>
                </div>
                <p id="or-div">OR</p>
                <form id="form" action="">
                    <input name="email" type="email" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button>Sign In</button>
                    <p id="already-had-account">Don't have an account? <a href="./register">Create account</a></p>
                </form>
            </div>
            <div id="vertical-rl">Company</div>
        </div>
    </div>
  )
}

export default Form