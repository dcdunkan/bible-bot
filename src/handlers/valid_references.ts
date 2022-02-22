import { Context } from "../helpers/context.ts";

const message = `📜 <b>Valid References</b>
You can use any of the following formats:
— <i>Book</i>
— <i>Book Chapter</i>
— <i>Book Chapter:Verse</i>
— <i>Book Chapter:Verse-Verse</i>

The following <b>book names and abbreviations</b> are supported:
— <code>Genesis</code> · Gen · Ge
— <code>Exodus</code> · Ex · Exo
— <code>Leviticus</code> · Lev · Le
— <code>Numbers</code> · Num · Num
— <code>Deuteronomy</code> · Deut · Deu
— <code>Joshua</code> · Josh · Josh
— <code>Judges</code> · Judg · Jud
— <code>Ruth</code> · Ruth · Rt
— <code>1 Samuel</code> · 1 Sam · 1 Sam
— <code>2 Samuel</code> · 2 Sam · 2 Sam
— <code>1 Kings</code> · 1 Kings · 1 King
— <code>2 Kings</code> · 2 Kings · 2 King
— <code>1 Chronicles</code> · 1 Chron · 1 Chro
— <code>2 Chronicles</code> · 2 Chron · 2 Chro
— <code>Ezra</code> · Ezra · Ez
— <code>Nehemiah</code> · Neh · Neh
— <code>Esther</code> · Est · Est
— <code>Job</code> · Job · Jb
— <code>Psalms</code> · Ps · Ps
— <code>Proverbs</code> · Prov · Prov
— <code>Ecclesiastes</code> · Eccles · Eccl
— <code>Song of Songs</code> · Song · Songs
— <code>Isaiah</code> · Isa · Isa
— <code>Jeremiah</code> · Jer · Jer
— <code>Lamentations</code> · Lam · Lam
— <code>Ezekiel</code> · Ezek · Ezek
— <code>Daniel</code> · Dan · Dan
— <code>Hosea</code> · Hos · Ho
— <code>Joel</code> · Joel · Joel
— <code>Amos</code> · Amos · Amos
— <code>Obadiah</code> · Obad · Obad
— <code>Jonah</code> · Jonah · Jonah
— <code>Micah</code> · Mic · Mi
— <code>Nahum</code> · Nah · Nah
— <code>Habakkuk</code> · Hab · Hab
— <code>Zephaniah</code> · Zeph · Zeph
— <code>Haggai</code> · Hag · Hag
— <code>Zechariah</code> · Zech · Zech
— <code>Malachi</code> · Mal · Mal
— <code>Matthew</code> · Matt · Matt
— <code>Mark</code> · Mark · Mk
— <code>Luke</code> · Luke · Lk
— <code>John</code> · John · Jn
— <code>Acts of Apostles</code> · Acts · Act
— <code>Romans</code> · Rom · Rom
— <code>1 Corinthians</code> · 1 Cor · 1 Cor
— <code>2 Corinthians</code> · 2 Cor · 2 Cor
— <code>Galatians</code> · Gal · Gal
— <code>Ephesians</code> · Eph · Eph
— <code>Philippians</code> · Phil · Phil
— <code>Colossians</code> · Col · Col
— <code>1 Thessalonians</code> · 1 Thess · 1 Thes
— <code>2 Thessalonians</code> · 2 Thess · 2 Thes
— <code>1 Timothy</code> · 1 Tim · 1 Tim
— <code>2 Timothy</code> · 2 Tim · 2 Tim
— <code>Titus</code> · Titus · Tit
— <code>Philemon</code> · Philem · Philem
— <code>Hebrews</code> · Heb · Heb
— <code>James</code> · James · Jm
— <code>1 Peter</code> · 1 Peter · 1 Pet
— <code>2 Peter</code> · 2 Peter · 2 Pet
— <code>1 John</code> · 1 John · 1 Jn
— <code>2 John</code> · 2 John · 2 Jn
— <code>3 John</code> · 3 John · 3 Jn
— <code>Jude</code> · Jude · Jud
— <code>Revelation</code> · Rev · Re`;

export default async function (ctx: Context): Promise<void> {
  await ctx.reply(message);
}
