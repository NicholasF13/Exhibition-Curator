# Artwork Collection & Exhibiton App

This project is a react application that allows users to search for Artworks across the repositories of The Metropolitan Museum of Art & the Europeana web portal.

Users are able to able to click on artworks to view more information as well as add them to a personal temporary collection. Artworks from this collection can then be further added to an Exhibition page.

## Requirements

To run this application, it is necessary to have the following programs installed: Git, Node.js & Visual Studio Code(VS code)

1. To download Git, visit the following link. Download & run the installer

https://git-scm.com/downloads

2. To download Node.js, visit the following link below. Download & run the installer

https://nodejs.org/

3. To download vscode, use the link below. Download & run the installer

https://code.visualstudio.com/


## Instructions to run project locally


1. Open VS code & navigate to the top menu and click on 'Terminal' to open the terminal. With the terminal open, clone the repository using the following command: 

```
 git clone https://github.com/NicholasF13/Exhibition-Curator.git
```

2. Navigate to the project directory using:

```
cd exhibition-curator 
```

3. Install dependencies using:

```
npm install
```

4. Run the development server using: 

```
npm run dev
```
This should provide a link in the form of : http://localhost:xxxx/ where x will be a series of numbers, subjective to your machine. To open the app in your browser, hold control & click the link.

## Guide to using the App

1. On the home page, you will find a search box as well as a drop down menu to select the era of art you want to search through, if any. Once you have entered a search term & era if necessary, click the search button to display the results.

2. You can add artworks from the displayed results to a personal collection for later viewing by clicking 'Add to Collection' next to the specific artwork. To view Artworks you have added to your collection, click the Collection tab on the top menu of the website.

3. Once inside your personal collection, you can choose to remove items from your collection or add them to your personal exhibition by clicking the 'Add to Exhibition' button. 

4. Once inside your personal exhibition, you can likewise remove items by clicking 'Remove'.