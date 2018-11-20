/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has url for each feed', () => {
          for (feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        })

        it('has name for each feed', () => {
          for (feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          }
        })
    });

    describe('The menu', () => {
      it('is hidden by default', () => {
        expect($('.slide-menu')).not.toBeVisible;
      })

      it('changes visibility when menu icon is clicked', () => {
        $('.menu-icon-link').click();

        expect($('.slide-menu')).toBeVisible;
        expect($('body').hasClass('menu-hidden')).toBe(false);

        $('.menu-icon-link').click();

        expect($('.slide-menu')).not.toBeVisible;
        expect($('body').hasClass('menu-hidden')).toBe(true);
      })
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', () => {
      beforeEach((done) => {
        loadFeed(0, () => {
          done();
        })
      })

      it('after loadFeed completes its work there is at least a single element within feeds container', (done) => {
        expect($('.feed').length).not.toBe(0);
        expect($('.feed .entry').length).not.toBe(0);
        done();
      })
    })

    describe('New Feed Selection', () => {
      let firstContent, secondContent;
      beforeEach((done) => {
        loadFeed(0, () => {
          firstContent = $('.feed').text();
          loadFeed(1, () => {
            secondContent = $('.feed').text();
            done();
          })
        })
      })
      it('changes feed on new load feed', (done) => {
        expect(firstContent).not.toEqual(secondContent);
        done();
      })
    })
}());
