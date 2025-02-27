function updateAutoColumns() {
  document.querySelectorAll('.grid').forEach(grid => {
      const items = Array.from(grid.children);
      const totalColumns = 12;
      
      let usedColumns = 0;
      const autoColumns = [];
      
      items.forEach(item => {
          // Проверяем, есть ли у элемента класс col
          if (item.classList.contains('col')) {
              autoColumns.push(item);
          } else {
              // Ищем все col-* классы
              const colClasses = Array.from(item.classList).filter(cls => cls.startsWith('col-'));
              if (colClasses.length > 0) {
                  // Берем последний класс (на случай, если их несколько)
                  const colClass = colClasses[colClasses.length - 1];
                  const colValue = parseInt(colClass.split('-')[1]);
                  if (!isNaN(colValue)) {
                      usedColumns += colValue;
                  }
              }
          }
      });

      // Распределяем оставшиеся колонки
      if (autoColumns.length > 0) {
          const remainingColumns = totalColumns - usedColumns;
          const columnsPerAuto = Math.floor(remainingColumns / autoColumns.length);
          const remainder = remainingColumns % autoColumns.length;

          console.log(remainingColumns);
          // 5
          console.log(columnsPerAuto);
          // 2
          console.log(remainder);
          // 1
          
          autoColumns.forEach((item, index) => {
            const span = columnsPerAuto + (index === autoColumns.length - 1 ? remainder : 0);
            item.style.setProperty('--col-auto-span', span);
            item.style.gridColumnEnd = `span ${span}`;
        });
      }
  });
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', updateAutoColumns);

// Обновляем при изменении размера окна
window.addEventListener('resize', updateAutoColumns);