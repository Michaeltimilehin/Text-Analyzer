function wordCounter(text) {
  return 1


}


$(document).ready(function () {
$("form").submit(function (event) {
  event.preventDefault()
    let sentence = $("#sentence").val()
    let wordCount = wordCounter(text)
    $("#output").text(wordCount)
  })

  function wordCounter(text) {


    if (!text.trim()) {
      return 0
    }
    let counter = 0
    let array = text.split(" ")
    array.forEach(function (word) {
      if (!Number(word)) {
        counter++
      }
    })

    return counter
  }
  $(document).ready(function () {
    $("form").submit(function (event) {
      event.preventDefault()
      let sentence = $("#sentence").val()
      console.log(sentence)
      let wordCount = wordCounter(sentence)
      $("#output").text(wordCount)
    })
  })
})