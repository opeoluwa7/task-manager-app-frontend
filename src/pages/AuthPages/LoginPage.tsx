

import LoginForm from "../../components/ui-elements/Forms/LoginForm";

const Login = () => {
  
 
  
    return (
      <main className="main">
        <section className="form-card">
          <header className="flex flex-col items-center " >
            <h1 className="text-3xl font-bold"> Task Manager </h1>
            <br />
            <p className="text-lg font-semibold"> <em>Welcome back</em>, log in </p>
          </header>
          <br />

          <LoginForm />

         
        </section>

        <div className="overlay" />
      </main>
    )
}

export default Login
