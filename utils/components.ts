import { SbBlokData } from '@storyblok/react';

export function filterComponent<T extends SbBlokData>(arr: T[] | undefined, name: string, except: boolean) {
    return arr != null
        ? arr.filter((c) => {
              return except
                  ? c.component.toLocaleLowerCase() === name.toLocaleLowerCase()
                  : c.component.toLocaleLowerCase() !== name.toLocaleLowerCase();
          })
        : [];
}
