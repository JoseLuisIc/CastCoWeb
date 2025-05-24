<template>
  <div id="notFound">
    <img src="/static/img/logo.png" class="center-block logo">
    <div class="error-page">
        <h2 class="headline text-yellow"> 404</h2>

        <div class="error-content">
          <h3><i class="fa fa-warning text-yellow"></i> ¡Ups! Página no encontrada.</h3>

          <p>
            No pudimos encontrar la página que estabas buscando.
          </p>
        </div>
        <!-- /.error-content -->
      </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style>
#notFound {
  padding: 10em;
  color: black;
}
#notFound > img {
  background: black;
}
</style>
