/**
 * Test file to verify WordPress globals availability
 */
console.log('=== WordPress Globals Test ===');
console.log('window.wp exists:', !!window.wp);
console.log('window.wp.blocks exists:', !!window.wp?.blocks);
console.log('window.wp.blocks.registerBlockType exists:', !!window.wp?.blocks?.registerBlockType);
console.log('window.wp.element exists:', !!window.wp?.element);
console.log('window.wp.blockEditor exists:', !!window.wp?.blockEditor);
console.log('window.wp.components exists:', !!window.wp?.components);
console.log('window.wp.i18n exists:', !!window.wp?.i18n);
console.log('window.wp.domReady exists:', !!window.wp?.domReady);

if (window.wp?.blocks?.registerBlockType) {
    console.log('✓ Ready to register blocks!');

    // Try registering a simple test block
    try {
        window.wp.blocks.registerBlockType('test/globals-test', {
            title: 'Globals Test',
            category: 'common',
            edit: () => window.wp.element.createElement('div', null, 'Test Block'),
            save: () => null,
        });
        console.log('✓ Test block registered successfully!');
    } catch (e) {
        console.error('✗ Failed to register test block:', e);
    }
} else {
    console.error('✗ WordPress blocks API not available');
}
