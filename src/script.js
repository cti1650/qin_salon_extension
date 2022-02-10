(() => {
  const createTest = (name) => {
    let ele = document.createElement('div');
    ele.src = 'https://cti-tl.com/test_api/sakura/?id=' + name;
    // ele.style = 'padding-left:0.5rem;';
    ele.className = 'toTestLinks';
    fetch('https://cti-tl.com/test_api/sakura/?id=' + name + '&json')
      .then((data) => {
        return data.json();
      })
      .then((items) => {
        items.map((item) => {
          let aTag = document.createElement('a');
          aTag.title = item.name;
          aTag.href = item.url;
          aTag.target = '_blank';
          aTag.rel = 'noopener';
          aTag.innerHTML =
            '<img style="width:1.2rem;height:1.2rem;margin-left:3px;" src="' +
            item.favicon +
            '" alt="img" />';
          ele.appendChild(aTag);
        });
      });

    return ele;
  };
  if (document.querySelectorAll('div.toTestLinks'))
    document.querySelectorAll('div.toTestLinks').forEach((item) => {
      item.remove();
    });
  const Elements = document.querySelectorAll(
    'h2.company-name, div.company-name,div.searchCompanyName h3,div.listbox_detail-companyLogo h3,div#mainTitle h2,div.company-header__name h2,div.widget-content h5,div.widget-title h1,div.borderLightGray-bottom p,h1[class*=Header__CompanyName-sc],div[class*=BasicInfoSection__CompanyName-sc],div[class*=CompanyCardLateral__Name-sc]'
  );
  if (Elements) {
    Elements.forEach((ele) => {
      let companyName = encodeURIComponent(ele.innerText.trim());
      if (companyName) {
        if (!ele.querySelector('div.toTestLinks')) {
          ele.appendChild(createTest(companyName));
        }
      }
    });
  }
})();
