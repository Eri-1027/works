$(document).ready(function() {
    $('#removeModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget) // 選則當初觸發事件的按鈕
        var title = button.data('title') // 使用 data-* 來取得特定內容

        var modal = $(this)
        modal.find('.modal-title').text('確認' + title) // 寫入資料
    })
});