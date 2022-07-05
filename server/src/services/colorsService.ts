import db from "../config/sqlConfig";
import { Color } from "../types/Color";

export class colorsService {
  public async getAll() {
    try {
      db.query(
        `CREATE TABLE if not exists colors (id INT NOT NULL, name varchar(255) NOT NULL,  value varchar(255) NOT NULL,  votes INT NOT NULL, PRIMARY KEY (id))`
      );
      let colors: Color[] = await this.getColors();
      if (colors.length === 0) colors = await this.createColors();
      return colors;
    } catch (error) {
      throw error;
    }
  }

  public async updateColor(color: Color) {
    try {
      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE colors
          SET votes = ${color.votes}
          WHERE id = ${color.id}`,
          color,
          (error: Error, result: Color) => {
            if (error) reject(error);
            resolve(result);
          }
        );
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  public async updateAll(colors: Color[]) {
    try {
      await new Promise(() => {
        colors.map(async (color) => {
          await this.updateColor(color);
        });
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  private async createColors() {
    try {
      const values = this.getColorValues();
      await new Promise((resolve, reject) => {
        db.query(`INSERT INTO colors VALUES ?`, [values], (error: Error, result: Color[]) => {
          if (error) reject(error);
          resolve(result);
        });
      });
      return this.getColors();
    } catch (error) {
      throw error;
    }
  }

  private getColorValues() {
    return [
      [1, "Brown", "#795548", 13],
      [2, "Indigo", "#3f51b5", 3],
      [3, "Amber", "#ffc107", 2],
      [4, "Belize", "#2980b9", 10],
      [5, "Asbestos", "#7f8c8d", 9],
      [6, "Emerald", "#2ecc71", 1],
      [7, "Turqoise", "#1abc9c", 5],
      [8, "River", "#3498db", 2],
      [9, "Grey", "#9e9e9e", 4],
      [10, "Yellow", "#ffeb3b", 7],
      [11, "Plum", "#8e44ad", 8],
      [12, "Pink", "#e91e63", 7],
      [13, "Pumpkin", "#d35400", 1],
      [14, "GreenSea", "#16a085", 8],
      [15, "Concrete", "#95a5a6", 8],
      [16, "GreenSea", "#16a085", 11],
      [17, "Alizarin", "#e74c3c", 8],
      [18, "Green", "#4caf50", 2],
      [19, "Lime", "#cddc39", 8],
      [20, "Teal", "#009688", 10],
      [21, "Silver", "#bdc3c7", 3],
      [22, "Purple", "#9c27b0", 1],
      [23, "Orange", "#ff9800", 4],
      [24, "Cyan", "#00bcd4", 14],
      [25, "Turqoise", "#1abc9c", 2],
      [26, "Sunflower", "#f1c40f", 5],
      [27, "Pomegranate", "#c0392b", 14],
      [28, "Carrot", "#e67e22", 0],
      [29, "Emerald", "#2ecc71", 0],
      [30, "Blue", "#2196f3", 13],
      [31, "Amethyst", "#9b59b6", 5],
      [32, "Green", "#4caf50", 5],
      [33, "Red", "#f44336", 10],
      [34, "Asphalt", "#34495e", 4],
      [35, "Nephritis", "#27ae60", 2],
      [36, "Nephritis", "#27ae60", 1],
    ];
  }

  private async getColors() {
    let colors: Color[];
    await new Promise((resolve, reject) => {
      db.query("SELECT * FROM colors", (error: Error, result: Color[]) => {
        if (error) reject(error);
        colors = result;
        resolve(result);
      });
    });
    return colors;
  }
}

export default new colorsService();
