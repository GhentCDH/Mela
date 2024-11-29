<template>
  <div>
    <p>Home page</p>

    <Text
      :paragraphs="[
        {
          id: '1',
          lines: [
            { id: '1', content: 'Line 1' },
            { id: '2', content: 'Line 2' },
          ],
        },
        {
          id: '2',
          lines: [
            { id: '1', content: 'Line 1' },
            { id: '2', content: 'Line 2' },
          ],
        },
      ]"
    />
  </div>
</template>
