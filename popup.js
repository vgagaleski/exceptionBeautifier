/**
 * 
 * System.Exception: Test outer exceptio ---> System.Exception: Hello Exceptionat TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29    at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36     --- End of inner exception stack trace ---     at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41     at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21     at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56 
 * 
 * System.Exception: Test outer exception ---> System.Exception: Hello Exception!
   at TestExceptionGenerator.Spike.GetException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 29
   at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 36
   --- End of inner exception stack trace ---
   at TestExceptionGenerator.Spike.GetInnerException() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 41
   at TestExceptionGenerator.Spike.<GenericExceptionWithInnerException>b__1() in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 21
   at TestExceptionGenerator.Extensions.GetExceptionString(Action action) in c:\Code\personal\DotNetExceptionMessageFormatter\TestExceptionGenerator\Spike.cs:line 56
 *
 */
// Search the bookmarks when entering the search keyword.
$(function() {

  modalSetup()

  $('#input').change(function() {
     $('#output').val(formatStackTrace($('#input').val()));
  });

  $('#input').keypress(function (e) {
    if (e.which == 13) {
      $('#output').val(formatStackTrace($('#input').val()));
      if(isSaveToClipboardToggled()) {
        copyToClipboard();
      }
      return false;    //<---- Add this line
    }
  });

  $("#input").on("paste", function () {
    setTimeout(function() {
      $('#output').val(formatStackTrace($('#input').val()));
      if(isSaveToClipboardToggled()) {
        copyToClipboard();
      }
      
    });
  });

  $("#clearBtn").click(function() {
    $('#input').val('')
    $('#output').val('')
  });

  $('#settingsBtn').click(function() {
    openModal()
    // initializeSelectionComponent()
  });

});

// Modal is initialized as many times as we click settings btn
function modalSetup() {
  
  var saveButton = document.querySelector("#saveBtn");
  var closeButton = document.querySelector("#closeBtn");
  var closeXButton = document.querySelector('#closeXBtn');
  var toggle = document.querySelector("#toggle-checkbox");

  saveButton.addEventListener("click", function() {

    if (toggle.checked) {
      chrome.storage.local.set({'copyToClipboardToggle': true}, function() {
        console.log('Value is set to ' + true);
      });
    } else {
      chrome.storage.local.set({'copyToClipboardToggle': false}, function() {
        console.log('Value is set to ' + false);
      });
    }

    closeModal();
  });

  closeButton.addEventListener("click", function() {
    closeModal();
  });

  closeXButton.addEventListener("click", function() {
    closeModal();
  });
}

function openModal() {
  var modalContent = document.querySelector("#modal-content");
  var modalBackground = document.querySelector("#modal-bg");
  initializeSaveToClipboardToggle();

  modalContent.classList.add("open");
  modalBackground.classList.add("open");
}

function closeModal() {
  var modalContent = document.querySelector("#modal-content");
  var modalBackground = document.querySelector("#modal-bg");
  
  modalContent.classList.remove("open");
  modalBackground.classList.remove("open");
}

function initializeSaveToClipboardToggle() {
  var toggle = document.querySelector("#toggle-checkbox");
  chrome.storage.local.get('copyToClipboardToggle', function(result) {
    console.log('Get storage value: ', JSON.stringify(result));
    if (Object.keys(result).length === 0) {
      if (!toggle.checked) {
        toggle.click();
        chrome.storage.local.set({'copyToClipboardToggle': true}, function() {
          console.log('Value is set to ' + true);
        });
      }
    } else {
      if (result.copyToClipboardToggle) {
        if (!toggle.checked) {
          toggle.click();
        }
      }
    }
  });
}

function isSaveToClipboardToggled() {
  var toggle = document.querySelector("#toggle-checkbox");
  if (toggle.checked) {
    console.log("Toggle checked");
    return true;
  } else {
    console.log("Toggle un-checked")
    return false;
  }
}

function initializeSelectionComponent() {
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".options-container");

  const optionsList = document.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });

  optionsList.forEach(o => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active");
    });
  });
}

function copyToClipboard() {
  var copyText = document.querySelector("#output");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  console.log("Text coppied to clipboard");
  // alert("Copied the text: " + copyText.value);
}

// function setStorageValue(key, value) {
//   console.log('[function]: setStorageValue()')
//   console.log('key =', key);
//   console.log('value =', value);
//   chrome.storage.local.set({'copyToClipboardToggle': value}, function() {
//     console.log('Value is set to ' + value);
//   });
// }

// function getStorageValue(key) {
//   console.log('[function]: getStorageValue()')
//   console.log('key = ', key);
//   chrome.storage.local.get('copyToClipboardToggle', function(result) {
//     console.log('Value currently is ' + JSON.stringify(result));
//   });
// }


function formatStackTrace(stackTrace) {

  if (!stackTrace || stackTrace == "") {
    return '';
  }

  let result = removeNewLines(stackTrace);

  // The list of tokens to find and prepend new lines.
  const replacementTokens = [
    {
        original: /---\s*at/g,
        replacement: '---\n    at'
    },
    {
        original: /\s+at /g,
        replacement: '\n    at '
    },
    {
        original: /--- End of inner exception stack trace ---/g, 
        replacement: '\n    --- End of inner exception stack trace ---'
    },
    {
      original: /--->/g,
      replacement: '\n  --->'
    },
    {
        original: /Caused by:/g,
        replacement: '\nCaused by:'
    },
    {
        original: /   \.\.\. /g,
        replacement: '\n   ... '
    },
    {
        // This rule should be last. Removes extra whitespace at the end of the lines.
        original: /\s+\n/g, 
        replacement: '\n'
    },
  ]

  replacementTokens.forEach(token => {
      result = result.replace(token.original, token.replacement);
  });

  return result;
}

function removeNewLines(stackTrace) {
  return stackTrace.replace(/(\r\n|\r|\n)/g, '');
}




