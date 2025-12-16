import { gameChapters } from './battleData';

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_') // Replace spaces with _
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '_'); // Replace multiple - with single -
}

const updatedGameChapters = gameChapters.map((chapter, chapterIndex) => {
  return {
    ...chapter,
    destinations: chapter.destinations.map((destination, destinationIndex) => {
      return {
        ...destination,
        battles: destination.battles.map((battle, battleIndex) => {
          const baseId = slugify(chapter.name) + '__' + slugify(destination.name) + '__' + slugify(battle.enemyName);
          let uniqueId = baseId;
          // Add an index to differentiate if the same enemyName appears multiple times in the same destination
          if (destination.battles.filter(b => b.enemyName === battle.enemyName).length > 1) {
            uniqueId = baseId + '__' + battleIndex;
          }
          return {
            ...battle,
            uniqueEnemyId: uniqueId,
          };
        }),
      };
    }),
  };
});

// To output the updated structure (for manual inspection or to replace the file content)
console.log(JSON.stringify(updatedGameChapters, null, 2));
