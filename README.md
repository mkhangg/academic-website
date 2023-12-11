# Academic Website

This repository contains source code of [my academic website](https://mkhangg.com/) using Jekyll as a static website generator. Feel free to clone this code for your personal use!

<p align="center">
  <img src="https://mkhangg.com/assets/img/devices_mockup_transparent.png" data-canonical-src="https://mkhangg.com/assets/img/devices_mockup_transparent.png" width="700"/><br/>
</p>

<!-- Update -->
## Update
List of updates (in terms of functionalities):

* **[30 Nov 2023]** Carousel for updates/news items (using [OwlCarousel2](https://owlcarousel2.github.io/OwlCarousel2/)) is added.
* **[23 Nov 2023]** Filter buttons with categories and Pagination (using [Isotope](https://isotope.metafizzy.co/)) for projects is added.
* **[19 Nov 2023]** Moving JS particles when dark theme is enabled (like [fireflies](https://en.wikipedia.org/wiki/Firefly)) is added.
* **[17 Nov 2023]** New webpage scrollbar style and progress bar are added.
* **[06 Nov 2023]** Sound effects when users interact with functionalities are added.
* **[04 Nov 2023]** Simple draggable pop-up icon (like [Messenger](https://en.wikipedia.org/wiki/Messenger_(software))) and sink to disappear the icon are added.
* **[30 Oct 2023]** Dark/Light theme toggle button is added and Dark/Light theme is displayed based on the client's time.

<!-- PREREQUISITES -->

## Prerequisites

* [Ruby with DevKit](https://rubyinstaller.org/downloads/) (version 3.2.2-1)
* [Jekyll](https://jekyllrb.com/) (version 4.3.2).

After installing Ruby, Jekyll can be installed via the following command:

```
gem install bundler jekyll 
```

Now, you can use Jekyll locally as a website (static) generator on your laptop.

<!-- USAGE -->

## Usage

This usage contains 4 relatively simple steps to make your own website.

**1. Clone the repository**

```
git clone https://github.com/mkhangg/academic-website.git
cd academic-website
```

**2. Customize personal information**

When opening the code from an IDE, you should see a structure like this:

```
.
├───assets                      # folder including your images, files, etc
├───js                  
    └───scripts.js              # the JS file for functional buttons
├───styles              
    └───styles.css              # the CSS file for colors and stuffs 
├───_data               
    ├───about.yaml              # data file for About section
    ├───footer.yaml             # data file for Footer section
    ├───gallery.yaml            # data file for Gallery section
    ├───outreach.yaml           # data file for Outreach section
    └───research.yaml           # data file for Research section
├───_layouts      
    └───main.html               # the HTML layout for the webpage 
├───_libs      
    ├───footer_widget.html      # html file for Footer widget
    ├───gallery_widget.html     # html file for Gallery widget
    ├───outreach_widget.html    # html file for Outreach widget
    └───research_widget.html    # html file for Research widget     
├───_sections           
    ├───about.html              # html file for About section
    ├───footer.html             # html file for Footer section
    ├───gallery.html            # html file for Gallery section
    ├───outreach.html           # html file for Outreach section
    └───research.html           # html file for Research section
├───_site                       # all contents for deployable version here!
    ├───assets
    ├───js
    ├───styles
    └───index.html              # the generated HTML file
├───index.md                    # markdown file that uses main.html as layout
└───_config.yml                 # information for webpage title and favicon
```

For example, you can modify the `_config.yml` file to your information:

```
# headers and icon 
title: your name
info: school/company abc
icon-pic: assets/img/favicon.png
```

The same modification procedure can be applied to the `_data` folder. As you can see, each Section will associate with its own Widget, *which is iteratively used* in each section, and its own data, *which serves as a list of information*. 

For example, `_sections/research.html` uses functions from `_libs/research_widget.html` and reads information from `_data/research.yaml`. So if you would like to modify your list of publications, go ahead and change these information in the `_data/research.yaml` file:

```
  - title: your paper title
    system-name: your system title
    gif: link to the representative image to your paper
    conference: conference/journal name
    conference-web: conference/journal webpage
    status: status of the paper
    authors: author list
    pdf: link to your paper
    code: code for your project
    demo: demo for your project
    slides: presentation slides 
    talk: video of your presentation
    abstract-less: portion of the paper's abstract
    abstract-more: the rest of the paper's abstract
    tag: a unique tag for your paper
```

However, if you can just leave anything field `blank`, it will just will not contain that information in the resultant HTML. **So don't worry about it!. You don't have to grid in all information, just leave some empty if you don't have it!**

**3. Run the webpage at localhost**

After changing to your information, the website can be tested using the following command:

```
bundle exec jekyll server
```

You can either see the web version in the `_site/index.html` file or go to your `localhost`: [http://localhost:4000](http://localhost:4000).

**4. Deploy the webpage at your desired host**

Some hosting services you can use are:

1. Amazon Web Service (AWS) - [tutorial](https://youtu.be/-l83oqcaTHg).
2. GitHub - [tutorial](https://youtu.be/M5mg0r4ajt4).

Hope you enjoy this tutorial and succesfully deploy for webpage!

<!-- NOTE -->

## Note:

> I might not synchronize this source code frequently with my webpage in terms of content, but I will try my best to update any functionalities that I added to the actual one. Besides that, you can scrape this and modify it based on your wishes.
