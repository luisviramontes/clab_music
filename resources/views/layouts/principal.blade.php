<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>RGCA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Responsive bootstrap 4 admin template" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('img/icono.ico') }}">

    <!-- Table datatable css -->

    {!! Html::style('assets/libs/datatables/dataTables.bootstrap4.min.css') !!}

    {!!Html::style('assets/libs/datatables/buttons.bootstrap4.min.css')!!}
    {!!Html::style('assets/libs/datatables/responsive.bootstrap4.min.css')!!}
    {!!Html::style('assets/libs/datatables/select.bootstrap4.min.css')!!}




    <!-- App css -->

    {!!Html::style('assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.css')!!}
    {!!Html::style('assets/libs/dropify/dropify.min.css')!!}
    {!!Html::style('assets/libs/custombox/custombox.min.css')!!}
    {!!Html::style('assets/css/bootstrap.min.css')!!}
    {!!Html::style('assets/libs/select2/select2.min.css')!!}
    {!!Html::style('assets/libs/multiselect/multi-select.css')!!}
    {!!Html::style('assets/css/icons.min.css')!!}
    {!!Html::style('assets/css/app.min.css')!!}
    {!!Html::style('assets/libs/bootstrap-datepicker/bootstrap-datepicker.min.css')!!}

    {!!Html::style('assets/libs/datatables/dataTables.bootstrap4.min.css')!!}
    {!!Html::style('assets/libs/datatables/buttons.bootstrap4.min.css')!!}
    {!!Html::style('assets/libs/datatables/responsive.bootstrap4.min.css')!!}
    {!!Html::style('assets/libs/datatables/select.bootstrap4.min.css')!!}

    {!!Html::script('js/script.js')!!}
    {!!Html::script('js/vendor/jquery.min.js')!!}
    {!!Html::script('js/vendor/bootstrap.js')!!}
    {!!Html::script('js/vendor/bootstrap.bundle.js')!!}

    <!-- SWEET ALERT -->
    {!!Html::script('assets/libs/sweetalert2/sweetalert2.min.css')!!}

    <!-- Plugins css -->
    {!!Html::style('assets/libs/switchery/switchery.min.css')!!}
    {!!Html::style('assets/libs/jstree/style.css')!!}

    {!!Html::style('assets/libs/fullcalendar/fullcalendar.min.css')!!}
    {!!Html::style('assets/vendor/animate.css/animate.min.css')!!}




</head>

<body>

    <!-- Begin page -->
    <div id="wrapper">


        <!-- Topbar Start -->
        <div class="navbar-custom">
            <ul class="list-unstyled topnav-menu float-right mb-0">
                @if (Auth::guest())
                <li class="dropdown notification-list">
                    <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                        href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <span class="d-none d-sm-inline-block ml-1 font-weight-medium" id="etiq_name">Inicia
                            Sesión</span>
                        <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <!-- item-->
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow text-white m-0">Bienvenido !</h6>
                        </div>

                        <!-- item-->


                        <div class="dropdown-divider"></div>

                        <!-- item-->
                        <a href="/auth/logout" class="dropdown-item notify-item">
                            <i class="mdi mdi-logout-variant"></i>
                            <span>Iniciar sesión</span>
                        </a>

                        <!-- item-->
                        <a href="/auth/register" class="dropdown-item notify-item">
                            <i class="mdi mdi-logout-variant"></i>
                            <span>Registrarse</span>
                        </a>

                    </div>
                </li>

                @else
                <li class="dropdown notification-list">
                    <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                        href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src="/img/user.png" alt="user-image" class="rounded-circle">
                        <span class="d-none d-sm-inline-block ml-1 font-weight-medium">{{ Auth::user()->name }}</span>
                        <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                        <!-- item-->
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow text-white m-0">Bienvenido !</h6>
                        </div>

                        <!-- item-->
                        <a href="/auth/logout" class="dropdown-item notify-item">
                            <i class="mdi mdi-logout-variant"></i>
                            <span>Cerrar sesión</span>
                        </a>



                    </div>
                </li>
                @endif




            </ul>

            <!-- LOGO -->
            <div class="logo-box">
                <a href="/welcome" class="logo text-center logo-dark">
                    <span class="logo-lg">
                        <img src="/img/logo.png" alt="" height="32">
                        <!-- <span class="logo-lg-text-dark">Uplon</span> -->
                    </span>
                    <span class="logo-sm">
                        <!-- <span class="logo-lg-text-dark">U</span> -->
                        <img src="/img/logo.png" alt="" height="34">
                    </span>
                </a>

                <a href="/welcome" class="logo text-center logo-light">
                    <span class="logo-lg">
                        <img src="/img/logo.png" alt="" height="22">
                        <!-- <span class="logo-lg-text-dark">Uplon</span> -->
                    </span>
                    <span class="logo-sm">
                        <!-- <span class="logo-lg-text-dark">U</span> -->
                        <img src="/img/logo.png" alt="" height="34">
                    </span>
                </a>
            </div>

            <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
                <li>
                    <button class="button-menu-mobile waves-effect waves-light">
                        <i class="mdi mdi-menu"></i>
                    </button>
                </li>


                <h3 style="color: white;padding-top: 10px;">RGCA</h3>
            </ul>
        </div>
        <!-- end Topbar -->


        <!-- ========== Left Sidebar Start ========== -->
        <div class="left-side-menu">

            <div class="slimscroll-menu">

                <!--- Sidemenu -->
                <div id="sidebar-menu">

                    <ul class="metismenu" id="side-menu">

                        <li class="menu-title">Formularios</li>

                        <li>
                            <a href="/formularios">
                                <i class="mdi mdi-view-dashboard"></i>
                                <span> Formularios </span>
                            </a>
                        </li>

                        <li>
                            <a href="/preguntas">
                                <i class="mdi mdi-view-dashboard"></i>
                                <span> Preguntas </span>
                            </a>
                        </li>
                        <li>
                            <a href="/formularios_contestados">
                                <i class="mdi mdi-view-dashboard"></i>
                                <span> Respuestas </span>
                            </a>
                        </li>

                       
                      
                    



                    </ul>

                </div>
                <!-- End Sidebar -->

                <div class="clearfix"></div>

            </div>
            <!-- Sidebar -left -->

        </div>
        <!-- Left Sidebar End -->

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            @if(Session::has('errors'))
            <div class="alert alert-warning  alert-dismissible fade show mt-4 bt-4" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>


                <strong><?php print_r($errors) ?>.</strong>


            </div>
            @endif
            <div class="content">


                @yield('contenido')
            </div> <!-- end content -->



            <!-- Footer Start -->
            <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            2022 &copy; RGCA <a href="">Tecnored SA DE C.V</a>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- end Footer -->

        </div>

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

    </div>
    <!-- END wrapper -->



    <!-- Right Sidebar -->

    <!-- Plugin js-->
    {!!Html::script('assets/libs/parsleyjs/parsley.min.js')!!}
    <!-- Vendor js -->

    {!!Html::script('assets/js/vendor.min.js')!!}
    {!!Html::script('assets/libs/bootstrap-tagsinput/bootstrap-tagsinput.min.js')!!}
    {!!Html::script('assets/libs/multiselect/jquery.multi-select.js')!!}
    {!!Html::script('assets/libs/select2/select2.min.js')!!}
    {!!Html::script('assets/libs/jquery-mockjax/jquery.mockjax.min.js')!!}
    {!!Html::script('assets/libs/custombox/custombox.min.js')!!}

    {!!Html::script('assets/libs/datatables/jquery.dataTables.min.js')!!}
    {!!Html::script('assets/libs/datatables/dataTables.bootstrap4.min.js')!!}

    {!!Html::script('assets/libs/datatables/dataTables.responsive.min.js')!!}
    {!!Html::script('assets/libs/datatables/responsive.bootstrap4.min.js')!!}

    {!!Html::script('assets/libs/datatables/dataTables.buttons.min.js')!!}
    {!!Html::script('assets/libs/datatables/buttons.bootstrap4.min.js')!!}

    {!!Html::script('assets/libs/jszip/jszip.min.js')!!}
    {!!Html::script('assets/libs/pdfmake/pdfmake.min.js')!!}
    {!!Html::script('assets/libs/pdfmake/vfs_fonts.js')!!}
    {!!Html::script('assets/libs/datatables/buttons.html5.min.js')!!}
    {!!Html::script('assets/libs/datatables/buttons.print.min.js')!!}
    {!!Html::script('assets/libs/datatables/dataTables.keyTable.min.js')!!}
    {!!Html::script('assets/libs/datatables/dataTables.select.min.js')!!}
    {!!Html::script('assets/libs/bootstrap-datepicker/bootstrap-datepicker.min.js')!!}
    <!-- Datatables init -->
    {!!Html::script('assets/js/pages/datatables.init.js')!!}
    <!-- App js -->
    {!!Html::script('assets/js/pages/form-advanced.init.js')!!}
    {!!Html::script('assets/libs/dropify/dropify.min.js')!!}
    {!!Html::script('assets/js/pages/form-fileuploads.init.js')!!}
    <!-- App js -->
    {!!Html::script('assets/js/app.min.js')!!}
    <!-- Validation init js-->
    {!!Html::script('assets/js/pages/form-validation.init.js')!!}
    <!-- Sweet Alerts js -->
    {!!Html::script('assets/libs/sweetalert2/sweetalert2.min.js')!!}
    <!-- Sweet alert init js-->
    {!!Html::script('assets/js/pages/sweet-alerts.init.js')!!}
    {!!Html::script('https://cdn.jsdelivr.net/npm/sweetalert2@10')!!}


    {!!Html::script('aassets/libs/switchery/switchery.min.js')!!}
    {!!Html::script('assets/libs/jquery-quicksearch/jquery.quicksearch.min.js')!!}
    {!!Html::script('assets/libs/autocomplete/jquery.autocomplete.min.js')!!}
    {!!Html::script('assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js')!!}

    <!-- jstree js -->
    {!!Html::script('assets/libs/jstree/jstree.min.js')!!}
    {!!Html::script('assets/js/pages/treeview.init.js')!!}


    <!--Form Wizard-->
    {!!Html::script('assets/libs/jquery-steps/jquery.steps.min.js')!!}
    {!!Html::script('assets/libs/jquery-validation/jquery.validate.min.js')!!}
    {!!Html::script('assets/js/pages/form-wizard.init.js')!!}

    <!--CK EDITOR-->
    {!!Html::script('assets/vendor/ckeditor/ckeditor.js')!!}
    <!-- Plugins js -->
    {!!Html::script('assets/libs/jquery-mask-plugin/jquery.mask.min.js')!!}
    {!!Html::script('assets/libs/autonumeric/autoNumeric.min.js')!!}

    <!-- plugin js -->
    {!!Html::script('assets/libs/moment/moment.min.js')!!}
    {!!Html::script('assets/libs/jquery-ui/jquery-ui.min.js')!!}
    {!!Html::script('assets/libs/fullcalendar/fullcalendar.min.js')!!}

    <!-- Calendar init -->
    {!!Html::script('assets/js/pages/calendar.init.js')!!}

    <!--Morris Chart-->
    {!!Html::script('assets/libs/morris-js/morris.min.js')!!}
    {!!Html::script('assets/libs/raphael/raphael.min.js')!!}


    <!-- Dashboard init js-->
    {!!Html::script('assets/js/pages/dashboard.init.js')!!}


    @yield('javascript')



</body>

</html>