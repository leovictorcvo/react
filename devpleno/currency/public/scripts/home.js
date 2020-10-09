$(function() {
    $('#quantidade').val(0);
    $('#mensagemErro').html('');

    $('#converterBtn').click(function() {
        const cotacao = parseFloat($('#cotacao').val());
        const quantidade = parseFloat($('#quantidade').val());

        if (cotacao && quantidade) {
            return $('#formConversao').submit();
        }

        $('#mensagemErro').html('Informe a cotação e a quantidade de dólares para conversão');
    });
});