<?xml version="1.0" encoding="UTF-8"?>
<!--
  A feed is XML, and a browser shows raw markup by default, which reads as a
  broken page to anyone who clicks the link out of curiosity. This stylesheet
  renders it as a normal page for humans while leaving the XML untouched for
  feed readers.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>

  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title><xsl:value-of select="title"/> — feed</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap"/>
        <style>
          :root { color-scheme: light dark; --bg:#faf9f7; --ink:#16181d; --muted:#55606f;
                  --faint:#818b9c; --rule:rgba(20,26,40,.14); --accent:#0551ff; --raised:#fff; }
          @media (prefers-color-scheme: dark) {
            :root { --bg:#131314; --ink:#e6e1e5; --muted:#948f94; --faint:#6b6870;
                    --rule:rgba(255,255,255,.11); --accent:#adc6ff; --raised:#1c1b1c; }
          }
          * { margin:0; padding:0; box-sizing:border-box }
          body { background:var(--bg); color:var(--muted); font-family:Outfit,system-ui,sans-serif;
                 -webkit-font-smoothing:antialiased; }
          .wrap { max-width:68ch; margin:0 auto; padding:60px 24px 90px }
          .kicker { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.14em;
                    text-transform:uppercase; color:var(--faint) }
          h1 { margin-top:14px; font-size:34px; font-weight:700; color:var(--ink); letter-spacing:-.03em }
          .desc { margin-top:12px; font-size:17px; line-height:1.55 }
          .note { margin:26px 0 34px; padding:16px 18px; border:1px solid var(--rule);
                  border-radius:10px; background:var(--raised); font-size:14.5px; line-height:1.6 }
          .note code { font-family:"JetBrains Mono",monospace; font-size:12.5px; color:var(--accent);
                       word-break:break-all }
          .note a { color:var(--accent) }
          h2 { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.14em;
               text-transform:uppercase; color:var(--faint); margin-bottom:8px }
          .item { padding:20px 0; border-bottom:1px solid var(--rule) }
          .item a { color:var(--ink); text-decoration:none; font-size:20px; font-weight:600;
                    letter-spacing:-.015em; display:block }
          .item a:hover { color:var(--accent) }
          .date { font-family:"JetBrains Mono",monospace; font-size:11px; color:var(--faint) }
          .item p { margin-top:7px; font-size:15.5px; line-height:1.55 }
          .back { display:inline-block; margin-top:32px; font-family:"JetBrains Mono",monospace;
                  font-size:12.5px; color:var(--accent); text-decoration:none }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="kicker">RSS feed</div>
          <h1><xsl:value-of select="title"/></h1>
          <p class="desc"><xsl:value-of select="description"/></p>

          <div class="note">
            This page is a <strong>feed</strong>, meant for a reader app rather than a browser.
            Paste this address into one — NetNewsWire, Feedly, Reeder — to get new posts
            automatically:
            <br/><br/>
            <code><xsl:value-of select="atom:link/@href"/></code>
          </div>

          <h2><xsl:value-of select="count(item)"/> post(s)</h2>
          <xsl:for-each select="item">
            <div class="item">
              <div class="date"><xsl:value-of select="substring(pubDate, 1, 16)"/></div>
              <a href="{link}"><xsl:value-of select="title"/></a>
              <p><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>

          <a class="back" href="{link}">← back to the blog</a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
