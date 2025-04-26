import RegisterForm from "../../components/ui-elements/Forms/RegisterForm"

const Register = () => {
  return (
  <main className="main">
    <section className="form-card">
      <header className="flex flex-col items-center relative bottom-8" >
      <h1 className="text-3xl font-bold"> Task Manager </h1>
      <br />
      <p className="text-lg font-semibold"> <em>Welcome</em>, sign up </p>
      </header>
      <br />

      <RegisterForm />
    </section>

    <div className="overlay" />
  </main>
  )
}

export default Register
