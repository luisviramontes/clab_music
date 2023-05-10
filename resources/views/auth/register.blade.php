<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>REGISTRO DE USUARIOS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Responsive bootstrap 4 admin template" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <!-- App css -->


    {!!Html::style('assets/css/bootstrap.min.css')!!}
    {!!Html::style('assets/css/icons.min.css')!!}
    {!!Html::style('assets/css/app.min.css')!!}


</head>

<body class="authentication-bg">

    <div class="container">
        @if(Session::has('errors'))
        <div class="alert alert-warning  alert-dismissible fade show mt-4 bt-4" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong><?php print_r($errors) ?>.</strong>


        </div>
        @endif

        @if(Session::has('status'))
        <div class="alert alert-success  alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>{{ Session::get('status') }}</strong>
        </div>
        @endif

    </div>

    <div class="account-pages pt-5 my-5">
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="account-card-box">
                        <div class="card mb-0">
                            <div class="card-body p-4">

                                <div class="text-center">
                                    <div class="my-3">
                                        <a href="/">
                                            <span><img src="../img/logo.png" alt="" height="48"></span>
                                        </a>
                                    </div>
                                    <h5 class="text-muted text-uppercase py-3 font-16">REGISTRO DE USUARIOS </h5>
                                </div>

                                <form action="/auth/register"  method="post"  id="formulario" name="formulario"
                                    enctype="multipart/form-data" class="form-group mt-2">
                                    {{csrf_field()}}

                                    <label for="userName">Email<span class="text-danger">*</span></label>
                                    <div class="form-group mb-3">
                                        <input class="form-control" id="email" name="email" type="email" required=""
                                            placeholder="Ingresa el email">
                                    </div>

                                    <label for="userName">Confirma tu email<span class="text-danger">*</span></label>
                                    <div class="form-group mb-3">
                                        <input class="form-control" onKeyUp="valida_email_register();"
                                            id="email_confirm" name="email_confirm" type="email" required=""
                                            placeholder="Confirma el email">
                                        <div class="text-danger" id='error_email' name="error_email"></div>
                                    </div>


                                    <div class="form-group">
                                        <label for="userName">Nombre<span class="text-danger">*</span></label>
                                        <div class="form-group mb-3">
                                            <input class="form-control" type="text" value="{{old('name')}}"
                                                onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"
                                                id="name" name="name" required=""
                                                placeholder="Ingresa el nombre completo">
                                        </div>



                                    </div>






                                    <div class="form-group mb-3">
                                        <label for="userName">Contraseña de usuario para el sistema <span
                                                class="text-danger">*</span></label>
                                        <input class="form-control" type="password" required="" name="password"
                                            id="password" placeholder="Ingresa la contraseña">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="userName">Confirmar contraseña de usuario para el sistema <span
                                                class="text-danger">*</span></label>
                                        <input class="form-control" type="password" required=""
                                            id="password_confirmation" name="password_confirmation"
                                            onKeyUp="valida_contra();" placeholder="Repite la contraseña">
                                        <div class="text-danger" id='error_pass' name="error_pass"></div>
                                    </div>




                                    <div class="form-group text-center">
                                        <button class="btn btn-success btn-block waves-effect waves-light" type="submit"
                                            id="submit3">Registrar </button>
                                    </div>

                                </form>



                            </div> <!-- end card-body -->
                        </div>
                        <!-- end card -->
                    </div>

                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <p class="text-white-50">Ya tienes una cuenta? <a href="../auth/login"
                                    class="text-white ml-1"><b>Inicia sesión</b></a></p>
                        </div> <!-- end col -->
                    </div>
                    <!-- end row -->

                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->



    {!!Html::script('assets/js/vendor.min.js')!!}
    {!!Html::script('assets/js/app.min.js')!!}
    {!!Html::script('js/script.js')!!}

</body>

</html>